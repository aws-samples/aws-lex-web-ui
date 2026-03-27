/*
 Copyright 2017-2024 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
*/

/**
 * AWS Signature V4 signing utilities
 * 
 * This module provides request signing functionality using AWS SDK v3's SignatureV4.
 */

import { SignatureV4 } from '@smithy/signature-v4';
import { Sha256 } from '@aws-crypto/sha256-js';
import { HttpRequest } from '@smithy/protocol-http';

export async function signRequest(request, credentials, serviceInfo) {
  const { region, service } = serviceInfo;
  
  // Parse the URL
  const url = new URL(request.url);
  
  // Create HttpRequest for signing
  const httpRequest = new HttpRequest({
    method: request.method || 'GET',
    protocol: url.protocol,
    hostname: url.hostname,
    port: url.port ? parseInt(url.port) : undefined,
    path: url.pathname,
    query: Object.fromEntries(url.searchParams),
    headers: {
      'host': url.hostname,
      ...(request.headers || {}),
    },
    body: request.data || request.body,
  });

  // Create signer with AWS credentials
  const signer = new SignatureV4({
    credentials: {
      accessKeyId: credentials.access_key || credentials.accessKeyId,
      secretAccessKey: credentials.secret_key || credentials.secretAccessKey,
      sessionToken: credentials.session_token || credentials.sessionToken,
    },
    region,
    service,
    sha256: Sha256,
  });

  // Sign the request
  const signedRequest = await signer.sign(httpRequest);

  // Convert back to fetch-compatible format
  return {
    url: `${signedRequest.protocol}//${signedRequest.hostname}${signedRequest.port ? ':' + signedRequest.port : ''}${signedRequest.path}`,
    method: signedRequest.method,
    headers: signedRequest.headers,
    body: signedRequest.body,
    mode: request.mode,
  };
}

export async function signUrl(urlString, credentials, serviceInfo, expirationSeconds = 3600) {
  const { region, service } = serviceInfo;
  
  // Parse the URL
  const url = new URL(urlString);
  
  // Convert wss:// to https:// for signing, then convert back
  const isWebSocket = url.protocol === 'wss:' || url.protocol === 'ws:';
  const signingProtocol = isWebSocket ? 'https:' : url.protocol;
  
  // Create HttpRequest for signing
  const httpRequest = new HttpRequest({
    method: 'GET',
    protocol: signingProtocol,
    hostname: url.hostname,
    port: url.port ? parseInt(url.port) : undefined,
    path: url.pathname,
    query: Object.fromEntries(url.searchParams),
    headers: {
      'host': url.hostname,
    },
  });

  // Create signer with AWS credentials
  const signer = new SignatureV4({
    credentials: {
      accessKeyId: credentials.access_key || credentials.accessKeyId,
      secretAccessKey: credentials.secret_key || credentials.secretAccessKey,
      sessionToken: credentials.session_token || credentials.sessionToken,
    },
    region,
    service,
    sha256: Sha256,
  });

  // Presign the request (for WebSocket connections)
  const signedRequest = await signer.presign(httpRequest, {
    expiresIn: expirationSeconds,
  });

  // Build the signed URL
  const signedUrl = new URL(`${signedRequest.protocol}//${signedRequest.hostname}${signedRequest.port ? ':' + signedRequest.port : ''}${signedRequest.path}`);
  
  // Add query parameters from the signed request
  if (signedRequest.query) {
    Object.entries(signedRequest.query).forEach(([key, value]) => {
      signedUrl.searchParams.set(key, value);
    });
  }

  // Convert back to WebSocket protocol if needed
  if (isWebSocket) {
    signedUrl.protocol = url.protocol;
  }

  return signedUrl.toString();
}
