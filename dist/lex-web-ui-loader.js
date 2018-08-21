(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ChatBotUiLoader"] = factory();
	else
		root["ChatBotUiLoader"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdateChatBotUiLoader"];
/******/ 	window["webpackHotUpdateChatBotUiLoader"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "0a7465d503b274cce7c2"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./index.js")(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../node_modules/babel-runtime/core-js/object/assign.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("../../../node_modules/core-js/library/fn/object/assign.js"), __esModule: true };

/***/ }),

/***/ "../../../node_modules/babel-runtime/core-js/object/create.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("../../../node_modules/core-js/library/fn/object/create.js"), __esModule: true };

/***/ }),

/***/ "../../../node_modules/babel-runtime/core-js/object/define-property.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("../../../node_modules/core-js/library/fn/object/define-property.js"), __esModule: true };

/***/ }),

/***/ "../../../node_modules/babel-runtime/core-js/object/get-own-property-descriptor.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("../../../node_modules/core-js/library/fn/object/get-own-property-descriptor.js"), __esModule: true };

/***/ }),

/***/ "../../../node_modules/babel-runtime/core-js/object/get-prototype-of.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("../../../node_modules/core-js/library/fn/object/get-prototype-of.js"), __esModule: true };

/***/ }),

/***/ "../../../node_modules/babel-runtime/core-js/object/keys.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("../../../node_modules/core-js/library/fn/object/keys.js"), __esModule: true };

/***/ }),

/***/ "../../../node_modules/babel-runtime/core-js/object/set-prototype-of.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("../../../node_modules/core-js/library/fn/object/set-prototype-of.js"), __esModule: true };

/***/ }),

/***/ "../../../node_modules/babel-runtime/core-js/promise.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("../../../node_modules/core-js/library/fn/promise.js"), __esModule: true };

/***/ }),

/***/ "../../../node_modules/babel-runtime/core-js/symbol.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("../../../node_modules/core-js/library/fn/symbol/index.js"), __esModule: true };

/***/ }),

/***/ "../../../node_modules/babel-runtime/core-js/symbol/iterator.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("../../../node_modules/core-js/library/fn/symbol/iterator.js"), __esModule: true };

/***/ }),

/***/ "../../../node_modules/babel-runtime/helpers/classCallCheck.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),

/***/ "../../../node_modules/babel-runtime/helpers/createClass.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__("../../../node_modules/babel-runtime/core-js/object/define-property.js");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),

/***/ "../../../node_modules/babel-runtime/helpers/extends.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__("../../../node_modules/babel-runtime/core-js/object/assign.js");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),

/***/ "../../../node_modules/babel-runtime/helpers/get.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__("../../../node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__("../../../node_modules/babel-runtime/core-js/object/get-own-property-descriptor.js");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/***/ }),

/***/ "../../../node_modules/babel-runtime/helpers/inherits.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__("../../../node_modules/babel-runtime/core-js/object/set-prototype-of.js");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__("../../../node_modules/babel-runtime/core-js/object/create.js");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__("../../../node_modules/babel-runtime/helpers/typeof.js");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),

/***/ "../../../node_modules/babel-runtime/helpers/possibleConstructorReturn.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__("../../../node_modules/babel-runtime/helpers/typeof.js");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),

/***/ "../../../node_modules/babel-runtime/helpers/typeof.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__("../../../node_modules/babel-runtime/core-js/symbol/iterator.js");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__("../../../node_modules/babel-runtime/core-js/symbol.js");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),

/***/ "../../../node_modules/core-js/library/fn/object/assign.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../node_modules/core-js/library/modules/es6.object.assign.js");
module.exports = __webpack_require__("../../../node_modules/core-js/library/modules/_core.js").Object.assign;


/***/ }),

/***/ "../../../node_modules/core-js/library/fn/object/create.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../node_modules/core-js/library/modules/es6.object.create.js");
var $Object = __webpack_require__("../../../node_modules/core-js/library/modules/_core.js").Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),

/***/ "../../../node_modules/core-js/library/fn/object/define-property.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../node_modules/core-js/library/modules/es6.object.define-property.js");
var $Object = __webpack_require__("../../../node_modules/core-js/library/modules/_core.js").Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ "../../../node_modules/core-js/library/fn/object/get-own-property-descriptor.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../node_modules/core-js/library/modules/es6.object.get-own-property-descriptor.js");
var $Object = __webpack_require__("../../../node_modules/core-js/library/modules/_core.js").Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),

/***/ "../../../node_modules/core-js/library/fn/object/get-prototype-of.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../node_modules/core-js/library/modules/es6.object.get-prototype-of.js");
module.exports = __webpack_require__("../../../node_modules/core-js/library/modules/_core.js").Object.getPrototypeOf;


/***/ }),

/***/ "../../../node_modules/core-js/library/fn/object/keys.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../node_modules/core-js/library/modules/es6.object.keys.js");
module.exports = __webpack_require__("../../../node_modules/core-js/library/modules/_core.js").Object.keys;


/***/ }),

/***/ "../../../node_modules/core-js/library/fn/object/set-prototype-of.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../node_modules/core-js/library/modules/es6.object.set-prototype-of.js");
module.exports = __webpack_require__("../../../node_modules/core-js/library/modules/_core.js").Object.setPrototypeOf;


/***/ }),

/***/ "../../../node_modules/core-js/library/fn/promise.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../node_modules/core-js/library/modules/es6.object.to-string.js");
__webpack_require__("../../../node_modules/core-js/library/modules/es6.string.iterator.js");
__webpack_require__("../../../node_modules/core-js/library/modules/web.dom.iterable.js");
__webpack_require__("../../../node_modules/core-js/library/modules/es6.promise.js");
__webpack_require__("../../../node_modules/core-js/library/modules/es7.promise.finally.js");
__webpack_require__("../../../node_modules/core-js/library/modules/es7.promise.try.js");
module.exports = __webpack_require__("../../../node_modules/core-js/library/modules/_core.js").Promise;


/***/ }),

/***/ "../../../node_modules/core-js/library/fn/symbol/index.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../node_modules/core-js/library/modules/es6.symbol.js");
__webpack_require__("../../../node_modules/core-js/library/modules/es6.object.to-string.js");
__webpack_require__("../../../node_modules/core-js/library/modules/es7.symbol.async-iterator.js");
__webpack_require__("../../../node_modules/core-js/library/modules/es7.symbol.observable.js");
module.exports = __webpack_require__("../../../node_modules/core-js/library/modules/_core.js").Symbol;


/***/ }),

/***/ "../../../node_modules/core-js/library/fn/symbol/iterator.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../node_modules/core-js/library/modules/es6.string.iterator.js");
__webpack_require__("../../../node_modules/core-js/library/modules/web.dom.iterable.js");
module.exports = __webpack_require__("../../../node_modules/core-js/library/modules/_wks-ext.js").f('iterator');


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_a-function.js":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_add-to-unscopables.js":
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_an-instance.js":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_an-object.js":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("../../../node_modules/core-js/library/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_array-includes.js":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("../../../node_modules/core-js/library/modules/_to-iobject.js");
var toLength = __webpack_require__("../../../node_modules/core-js/library/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__("../../../node_modules/core-js/library/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_classof.js":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("../../../node_modules/core-js/library/modules/_cof.js");
var TAG = __webpack_require__("../../../node_modules/core-js/library/modules/_wks.js")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_cof.js":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_core.js":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_ctx.js":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("../../../node_modules/core-js/library/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_defined.js":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_descriptors.js":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("../../../node_modules/core-js/library/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_dom-create.js":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("../../../node_modules/core-js/library/modules/_is-object.js");
var document = __webpack_require__("../../../node_modules/core-js/library/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_enum-bug-keys.js":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_enum-keys.js":
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__("../../../node_modules/core-js/library/modules/_object-keys.js");
var gOPS = __webpack_require__("../../../node_modules/core-js/library/modules/_object-gops.js");
var pIE = __webpack_require__("../../../node_modules/core-js/library/modules/_object-pie.js");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_export.js":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("../../../node_modules/core-js/library/modules/_global.js");
var core = __webpack_require__("../../../node_modules/core-js/library/modules/_core.js");
var ctx = __webpack_require__("../../../node_modules/core-js/library/modules/_ctx.js");
var hide = __webpack_require__("../../../node_modules/core-js/library/modules/_hide.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_fails.js":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_for-of.js":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("../../../node_modules/core-js/library/modules/_ctx.js");
var call = __webpack_require__("../../../node_modules/core-js/library/modules/_iter-call.js");
var isArrayIter = __webpack_require__("../../../node_modules/core-js/library/modules/_is-array-iter.js");
var anObject = __webpack_require__("../../../node_modules/core-js/library/modules/_an-object.js");
var toLength = __webpack_require__("../../../node_modules/core-js/library/modules/_to-length.js");
var getIterFn = __webpack_require__("../../../node_modules/core-js/library/modules/core.get-iterator-method.js");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_global.js":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_has.js":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_hide.js":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("../../../node_modules/core-js/library/modules/_object-dp.js");
var createDesc = __webpack_require__("../../../node_modules/core-js/library/modules/_property-desc.js");
module.exports = __webpack_require__("../../../node_modules/core-js/library/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_html.js":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("../../../node_modules/core-js/library/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_ie8-dom-define.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("../../../node_modules/core-js/library/modules/_descriptors.js") && !__webpack_require__("../../../node_modules/core-js/library/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__("../../../node_modules/core-js/library/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_invoke.js":
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_iobject.js":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("../../../node_modules/core-js/library/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_is-array-iter.js":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("../../../node_modules/core-js/library/modules/_iterators.js");
var ITERATOR = __webpack_require__("../../../node_modules/core-js/library/modules/_wks.js")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_is-array.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("../../../node_modules/core-js/library/modules/_cof.js");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_is-object.js":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_iter-call.js":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("../../../node_modules/core-js/library/modules/_an-object.js");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_iter-create.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("../../../node_modules/core-js/library/modules/_object-create.js");
var descriptor = __webpack_require__("../../../node_modules/core-js/library/modules/_property-desc.js");
var setToStringTag = __webpack_require__("../../../node_modules/core-js/library/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("../../../node_modules/core-js/library/modules/_hide.js")(IteratorPrototype, __webpack_require__("../../../node_modules/core-js/library/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_iter-define.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("../../../node_modules/core-js/library/modules/_library.js");
var $export = __webpack_require__("../../../node_modules/core-js/library/modules/_export.js");
var redefine = __webpack_require__("../../../node_modules/core-js/library/modules/_redefine.js");
var hide = __webpack_require__("../../../node_modules/core-js/library/modules/_hide.js");
var has = __webpack_require__("../../../node_modules/core-js/library/modules/_has.js");
var Iterators = __webpack_require__("../../../node_modules/core-js/library/modules/_iterators.js");
var $iterCreate = __webpack_require__("../../../node_modules/core-js/library/modules/_iter-create.js");
var setToStringTag = __webpack_require__("../../../node_modules/core-js/library/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__("../../../node_modules/core-js/library/modules/_object-gpo.js");
var ITERATOR = __webpack_require__("../../../node_modules/core-js/library/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_iter-detect.js":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("../../../node_modules/core-js/library/modules/_wks.js")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_iter-step.js":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_iterators.js":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_library.js":
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_meta.js":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("../../../node_modules/core-js/library/modules/_uid.js")('meta');
var isObject = __webpack_require__("../../../node_modules/core-js/library/modules/_is-object.js");
var has = __webpack_require__("../../../node_modules/core-js/library/modules/_has.js");
var setDesc = __webpack_require__("../../../node_modules/core-js/library/modules/_object-dp.js").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("../../../node_modules/core-js/library/modules/_fails.js")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_microtask.js":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("../../../node_modules/core-js/library/modules/_global.js");
var macrotask = __webpack_require__("../../../node_modules/core-js/library/modules/_task.js").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__("../../../node_modules/core-js/library/modules/_cof.js")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_new-promise-capability.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__("../../../node_modules/core-js/library/modules/_a-function.js");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_object-assign.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__("../../../node_modules/core-js/library/modules/_object-keys.js");
var gOPS = __webpack_require__("../../../node_modules/core-js/library/modules/_object-gops.js");
var pIE = __webpack_require__("../../../node_modules/core-js/library/modules/_object-pie.js");
var toObject = __webpack_require__("../../../node_modules/core-js/library/modules/_to-object.js");
var IObject = __webpack_require__("../../../node_modules/core-js/library/modules/_iobject.js");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("../../../node_modules/core-js/library/modules/_fails.js")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_object-create.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("../../../node_modules/core-js/library/modules/_an-object.js");
var dPs = __webpack_require__("../../../node_modules/core-js/library/modules/_object-dps.js");
var enumBugKeys = __webpack_require__("../../../node_modules/core-js/library/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__("../../../node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("../../../node_modules/core-js/library/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("../../../node_modules/core-js/library/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_object-dp.js":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("../../../node_modules/core-js/library/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__("../../../node_modules/core-js/library/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__("../../../node_modules/core-js/library/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__("../../../node_modules/core-js/library/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_object-dps.js":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("../../../node_modules/core-js/library/modules/_object-dp.js");
var anObject = __webpack_require__("../../../node_modules/core-js/library/modules/_an-object.js");
var getKeys = __webpack_require__("../../../node_modules/core-js/library/modules/_object-keys.js");

module.exports = __webpack_require__("../../../node_modules/core-js/library/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_object-gopd.js":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("../../../node_modules/core-js/library/modules/_object-pie.js");
var createDesc = __webpack_require__("../../../node_modules/core-js/library/modules/_property-desc.js");
var toIObject = __webpack_require__("../../../node_modules/core-js/library/modules/_to-iobject.js");
var toPrimitive = __webpack_require__("../../../node_modules/core-js/library/modules/_to-primitive.js");
var has = __webpack_require__("../../../node_modules/core-js/library/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__("../../../node_modules/core-js/library/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("../../../node_modules/core-js/library/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_object-gopn-ext.js":
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__("../../../node_modules/core-js/library/modules/_to-iobject.js");
var gOPN = __webpack_require__("../../../node_modules/core-js/library/modules/_object-gopn.js").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_object-gopn.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("../../../node_modules/core-js/library/modules/_object-keys-internal.js");
var hiddenKeys = __webpack_require__("../../../node_modules/core-js/library/modules/_enum-bug-keys.js").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_object-gops.js":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_object-gpo.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("../../../node_modules/core-js/library/modules/_has.js");
var toObject = __webpack_require__("../../../node_modules/core-js/library/modules/_to-object.js");
var IE_PROTO = __webpack_require__("../../../node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_object-keys-internal.js":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("../../../node_modules/core-js/library/modules/_has.js");
var toIObject = __webpack_require__("../../../node_modules/core-js/library/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__("../../../node_modules/core-js/library/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__("../../../node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_object-keys.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("../../../node_modules/core-js/library/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__("../../../node_modules/core-js/library/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_object-pie.js":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_object-sap.js":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("../../../node_modules/core-js/library/modules/_export.js");
var core = __webpack_require__("../../../node_modules/core-js/library/modules/_core.js");
var fails = __webpack_require__("../../../node_modules/core-js/library/modules/_fails.js");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_perform.js":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_promise-resolve.js":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("../../../node_modules/core-js/library/modules/_an-object.js");
var isObject = __webpack_require__("../../../node_modules/core-js/library/modules/_is-object.js");
var newPromiseCapability = __webpack_require__("../../../node_modules/core-js/library/modules/_new-promise-capability.js");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_property-desc.js":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_redefine-all.js":
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__("../../../node_modules/core-js/library/modules/_hide.js");
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_redefine.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../node_modules/core-js/library/modules/_hide.js");


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_set-proto.js":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("../../../node_modules/core-js/library/modules/_is-object.js");
var anObject = __webpack_require__("../../../node_modules/core-js/library/modules/_an-object.js");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("../../../node_modules/core-js/library/modules/_ctx.js")(Function.call, __webpack_require__("../../../node_modules/core-js/library/modules/_object-gopd.js").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_set-species.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("../../../node_modules/core-js/library/modules/_global.js");
var core = __webpack_require__("../../../node_modules/core-js/library/modules/_core.js");
var dP = __webpack_require__("../../../node_modules/core-js/library/modules/_object-dp.js");
var DESCRIPTORS = __webpack_require__("../../../node_modules/core-js/library/modules/_descriptors.js");
var SPECIES = __webpack_require__("../../../node_modules/core-js/library/modules/_wks.js")('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_set-to-string-tag.js":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("../../../node_modules/core-js/library/modules/_object-dp.js").f;
var has = __webpack_require__("../../../node_modules/core-js/library/modules/_has.js");
var TAG = __webpack_require__("../../../node_modules/core-js/library/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_shared-key.js":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("../../../node_modules/core-js/library/modules/_shared.js")('keys');
var uid = __webpack_require__("../../../node_modules/core-js/library/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_shared.js":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("../../../node_modules/core-js/library/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_species-constructor.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("../../../node_modules/core-js/library/modules/_an-object.js");
var aFunction = __webpack_require__("../../../node_modules/core-js/library/modules/_a-function.js");
var SPECIES = __webpack_require__("../../../node_modules/core-js/library/modules/_wks.js")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_string-at.js":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("../../../node_modules/core-js/library/modules/_to-integer.js");
var defined = __webpack_require__("../../../node_modules/core-js/library/modules/_defined.js");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_task.js":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("../../../node_modules/core-js/library/modules/_ctx.js");
var invoke = __webpack_require__("../../../node_modules/core-js/library/modules/_invoke.js");
var html = __webpack_require__("../../../node_modules/core-js/library/modules/_html.js");
var cel = __webpack_require__("../../../node_modules/core-js/library/modules/_dom-create.js");
var global = __webpack_require__("../../../node_modules/core-js/library/modules/_global.js");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__("../../../node_modules/core-js/library/modules/_cof.js")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_to-absolute-index.js":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("../../../node_modules/core-js/library/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_to-integer.js":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_to-iobject.js":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("../../../node_modules/core-js/library/modules/_iobject.js");
var defined = __webpack_require__("../../../node_modules/core-js/library/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_to-length.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("../../../node_modules/core-js/library/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_to-object.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("../../../node_modules/core-js/library/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_to-primitive.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("../../../node_modules/core-js/library/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_uid.js":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_wks-define.js":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("../../../node_modules/core-js/library/modules/_global.js");
var core = __webpack_require__("../../../node_modules/core-js/library/modules/_core.js");
var LIBRARY = __webpack_require__("../../../node_modules/core-js/library/modules/_library.js");
var wksExt = __webpack_require__("../../../node_modules/core-js/library/modules/_wks-ext.js");
var defineProperty = __webpack_require__("../../../node_modules/core-js/library/modules/_object-dp.js").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_wks-ext.js":
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__("../../../node_modules/core-js/library/modules/_wks.js");


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/_wks.js":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("../../../node_modules/core-js/library/modules/_shared.js")('wks');
var uid = __webpack_require__("../../../node_modules/core-js/library/modules/_uid.js");
var Symbol = __webpack_require__("../../../node_modules/core-js/library/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/core.get-iterator-method.js":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("../../../node_modules/core-js/library/modules/_classof.js");
var ITERATOR = __webpack_require__("../../../node_modules/core-js/library/modules/_wks.js")('iterator');
var Iterators = __webpack_require__("../../../node_modules/core-js/library/modules/_iterators.js");
module.exports = __webpack_require__("../../../node_modules/core-js/library/modules/_core.js").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/es6.array.iterator.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("../../../node_modules/core-js/library/modules/_add-to-unscopables.js");
var step = __webpack_require__("../../../node_modules/core-js/library/modules/_iter-step.js");
var Iterators = __webpack_require__("../../../node_modules/core-js/library/modules/_iterators.js");
var toIObject = __webpack_require__("../../../node_modules/core-js/library/modules/_to-iobject.js");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("../../../node_modules/core-js/library/modules/_iter-define.js")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/es6.object.assign.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__("../../../node_modules/core-js/library/modules/_export.js");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__("../../../node_modules/core-js/library/modules/_object-assign.js") });


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/es6.object.create.js":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("../../../node_modules/core-js/library/modules/_export.js");
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__("../../../node_modules/core-js/library/modules/_object-create.js") });


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/es6.object.define-property.js":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("../../../node_modules/core-js/library/modules/_export.js");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__("../../../node_modules/core-js/library/modules/_descriptors.js"), 'Object', { defineProperty: __webpack_require__("../../../node_modules/core-js/library/modules/_object-dp.js").f });


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/es6.object.get-own-property-descriptor.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__("../../../node_modules/core-js/library/modules/_to-iobject.js");
var $getOwnPropertyDescriptor = __webpack_require__("../../../node_modules/core-js/library/modules/_object-gopd.js").f;

__webpack_require__("../../../node_modules/core-js/library/modules/_object-sap.js")('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/es6.object.get-prototype-of.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__("../../../node_modules/core-js/library/modules/_to-object.js");
var $getPrototypeOf = __webpack_require__("../../../node_modules/core-js/library/modules/_object-gpo.js");

__webpack_require__("../../../node_modules/core-js/library/modules/_object-sap.js")('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/es6.object.keys.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("../../../node_modules/core-js/library/modules/_to-object.js");
var $keys = __webpack_require__("../../../node_modules/core-js/library/modules/_object-keys.js");

__webpack_require__("../../../node_modules/core-js/library/modules/_object-sap.js")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/es6.object.set-prototype-of.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__("../../../node_modules/core-js/library/modules/_export.js");
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__("../../../node_modules/core-js/library/modules/_set-proto.js").set });


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/es6.object.to-string.js":
/***/ (function(module, exports) {



/***/ }),

/***/ "../../../node_modules/core-js/library/modules/es6.promise.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("../../../node_modules/core-js/library/modules/_library.js");
var global = __webpack_require__("../../../node_modules/core-js/library/modules/_global.js");
var ctx = __webpack_require__("../../../node_modules/core-js/library/modules/_ctx.js");
var classof = __webpack_require__("../../../node_modules/core-js/library/modules/_classof.js");
var $export = __webpack_require__("../../../node_modules/core-js/library/modules/_export.js");
var isObject = __webpack_require__("../../../node_modules/core-js/library/modules/_is-object.js");
var aFunction = __webpack_require__("../../../node_modules/core-js/library/modules/_a-function.js");
var anInstance = __webpack_require__("../../../node_modules/core-js/library/modules/_an-instance.js");
var forOf = __webpack_require__("../../../node_modules/core-js/library/modules/_for-of.js");
var speciesConstructor = __webpack_require__("../../../node_modules/core-js/library/modules/_species-constructor.js");
var task = __webpack_require__("../../../node_modules/core-js/library/modules/_task.js").set;
var microtask = __webpack_require__("../../../node_modules/core-js/library/modules/_microtask.js")();
var newPromiseCapabilityModule = __webpack_require__("../../../node_modules/core-js/library/modules/_new-promise-capability.js");
var perform = __webpack_require__("../../../node_modules/core-js/library/modules/_perform.js");
var promiseResolve = __webpack_require__("../../../node_modules/core-js/library/modules/_promise-resolve.js");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__("../../../node_modules/core-js/library/modules/_wks.js")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__("../../../node_modules/core-js/library/modules/_redefine-all.js")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__("../../../node_modules/core-js/library/modules/_set-to-string-tag.js")($Promise, PROMISE);
__webpack_require__("../../../node_modules/core-js/library/modules/_set-species.js")(PROMISE);
Wrapper = __webpack_require__("../../../node_modules/core-js/library/modules/_core.js")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__("../../../node_modules/core-js/library/modules/_iter-detect.js")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/es6.string.iterator.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("../../../node_modules/core-js/library/modules/_string-at.js")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("../../../node_modules/core-js/library/modules/_iter-define.js")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/es6.symbol.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__("../../../node_modules/core-js/library/modules/_global.js");
var has = __webpack_require__("../../../node_modules/core-js/library/modules/_has.js");
var DESCRIPTORS = __webpack_require__("../../../node_modules/core-js/library/modules/_descriptors.js");
var $export = __webpack_require__("../../../node_modules/core-js/library/modules/_export.js");
var redefine = __webpack_require__("../../../node_modules/core-js/library/modules/_redefine.js");
var META = __webpack_require__("../../../node_modules/core-js/library/modules/_meta.js").KEY;
var $fails = __webpack_require__("../../../node_modules/core-js/library/modules/_fails.js");
var shared = __webpack_require__("../../../node_modules/core-js/library/modules/_shared.js");
var setToStringTag = __webpack_require__("../../../node_modules/core-js/library/modules/_set-to-string-tag.js");
var uid = __webpack_require__("../../../node_modules/core-js/library/modules/_uid.js");
var wks = __webpack_require__("../../../node_modules/core-js/library/modules/_wks.js");
var wksExt = __webpack_require__("../../../node_modules/core-js/library/modules/_wks-ext.js");
var wksDefine = __webpack_require__("../../../node_modules/core-js/library/modules/_wks-define.js");
var enumKeys = __webpack_require__("../../../node_modules/core-js/library/modules/_enum-keys.js");
var isArray = __webpack_require__("../../../node_modules/core-js/library/modules/_is-array.js");
var anObject = __webpack_require__("../../../node_modules/core-js/library/modules/_an-object.js");
var isObject = __webpack_require__("../../../node_modules/core-js/library/modules/_is-object.js");
var toIObject = __webpack_require__("../../../node_modules/core-js/library/modules/_to-iobject.js");
var toPrimitive = __webpack_require__("../../../node_modules/core-js/library/modules/_to-primitive.js");
var createDesc = __webpack_require__("../../../node_modules/core-js/library/modules/_property-desc.js");
var _create = __webpack_require__("../../../node_modules/core-js/library/modules/_object-create.js");
var gOPNExt = __webpack_require__("../../../node_modules/core-js/library/modules/_object-gopn-ext.js");
var $GOPD = __webpack_require__("../../../node_modules/core-js/library/modules/_object-gopd.js");
var $DP = __webpack_require__("../../../node_modules/core-js/library/modules/_object-dp.js");
var $keys = __webpack_require__("../../../node_modules/core-js/library/modules/_object-keys.js");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__("../../../node_modules/core-js/library/modules/_object-gopn.js").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__("../../../node_modules/core-js/library/modules/_object-pie.js").f = $propertyIsEnumerable;
  __webpack_require__("../../../node_modules/core-js/library/modules/_object-gops.js").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__("../../../node_modules/core-js/library/modules/_library.js")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__("../../../node_modules/core-js/library/modules/_hide.js")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/es7.promise.finally.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__("../../../node_modules/core-js/library/modules/_export.js");
var core = __webpack_require__("../../../node_modules/core-js/library/modules/_core.js");
var global = __webpack_require__("../../../node_modules/core-js/library/modules/_global.js");
var speciesConstructor = __webpack_require__("../../../node_modules/core-js/library/modules/_species-constructor.js");
var promiseResolve = __webpack_require__("../../../node_modules/core-js/library/modules/_promise-resolve.js");

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/es7.promise.try.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__("../../../node_modules/core-js/library/modules/_export.js");
var newPromiseCapability = __webpack_require__("../../../node_modules/core-js/library/modules/_new-promise-capability.js");
var perform = __webpack_require__("../../../node_modules/core-js/library/modules/_perform.js");

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/es7.symbol.async-iterator.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../node_modules/core-js/library/modules/_wks-define.js")('asyncIterator');


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/es7.symbol.observable.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../node_modules/core-js/library/modules/_wks-define.js")('observable');


/***/ }),

/***/ "../../../node_modules/core-js/library/modules/web.dom.iterable.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../node_modules/core-js/library/modules/es6.array.iterator.js");
var global = __webpack_require__("../../../node_modules/core-js/library/modules/_global.js");
var hide = __webpack_require__("../../../node_modules/core-js/library/modules/_hide.js");
var Iterators = __webpack_require__("../../../node_modules/core-js/library/modules/_iterators.js");
var TO_STRING_TAG = __webpack_require__("../../../node_modules/core-js/library/modules/_wks.js")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "../css/lex-web-ui-fullpage.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "../css/lex-web-ui-iframe.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./defaults/dependencies.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/**
 * Default DependencyLoader dependencies
 *
 * Loads third-party libraries from CDNs. May want to host your own for production
 *
 * Relative URLs (not starting with http) are prepended with a base URL at run time
 */
var dependenciesFullPage = exports.dependenciesFullPage = {
  script: [{
    name: 'AWS',
    url: 'https://sdk.amazonaws.com/js/aws-sdk-2.180.0.js',
    canUseMin: true
  }, {
    // mobile hub generated aws config
    name: 'aws_bots_config',
    url: './aws-config.js',
    optional: true
  }, {
    name: 'Vue',
    url: 'https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.js',
    canUseMin: true
  }, {
    name: 'Vuex',
    url: 'https://unpkg.com/vuex@3.0.1/dist/vuex.js',
    canUseMin: true
  }, {
    name: 'Vuetify',
    url: 'https://unpkg.com/vuetify@0.17.6/dist/vuetify.js',
    canUseMin: true
  }, {
    name: 'LexWebUi',
    url: './lex-web-ui.js',
    canUseMin: true
  }],
  css: [{
    name: 'roboto-material-icons',
    url: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
  }, {
    name: 'vuetify',
    url: 'https://unpkg.com/vuetify@0.17.6/dist/vuetify.css',
    canUseMin: true
  }, {
    name: 'lex-web-ui',
    url: './lex-web-ui.css',
    canUseMin: true
  }, {
    name: 'lex-web-ui-loader',
    url: './lex-web-ui-loader.css'
  }]
};

var dependenciesIframe = exports.dependenciesIframe = {
  script: [{
    name: 'AWS',
    url: 'https://sdk.amazonaws.com/js/aws-sdk-2.176.0.js',
    canUseMin: true
  }, {
    // mobile hub generated aws config
    name: 'aws_bots_config',
    url: './aws-config.js',
    optional: true
  }],
  css: [{
    name: 'lex-web-ui-loader',
    url: './lex-web-ui-loader.css'
  }]
};

/***/ }),

/***/ "./defaults/lex-web-ui.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/**
 * Base configuration object structure
 *
 * NOTE: you probably don't want to be making config changes here but rather
 * use the config loader to override the defaults
 */

var configBase = exports.configBase = {
  lex: { botName: '' },
  cognito: { poolId: '' },
  ui: { parentOrigin: '' },
  polly: {},
  recorder: {},
  iframe: {
    iframeOrigin: '',
    iframeSrcPath: '',
    shouldLoadIframeMinimized: true
  }
};

exports.default = configBase;

/***/ }),

/***/ "./defaults/loader.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optionsIframe = exports.optionsFullPage = exports.options = undefined;

var _extends2 = __webpack_require__("../../../node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/**
 * Default options and config structure
 *
 * NOTE: you probably don't want to be making config changes here but rather
 * use the config loader to override the defaults
 */

/**
 * Default loader options
 * Apply both to iframe and full page
 */
var options = exports.options = {
  // base URL to be prepended to relative URLs of dependencies
  // if left empty, a relative path will still be used
  baseUrl: '/',

  // time to wait for config event
  configEventTimeoutInMs: 10000,

  // URL to download config JSON file
  // uses baseUrl if set as a relative URL (not starting with http)
  configUrl: './lex-web-ui-loader-config.json',

  // controls whether the local config should be ignored when running
  // embedded (e.g. iframe) in which case the parent page will pass the config
  // Only the parentOrigin config field is kept when set to true
  shouldIgnoreConfigWhenEmbedded: true,

  // controls whether the config should be obtained using events
  shouldLoadConfigFromEvent: false,

  // controls whether the config should be downloaded from `configUrl`
  shouldLoadConfigFromJsonFile: true,

  // controls whether the config should be downloaded from Mobile Hub aws-config.js
  shouldLoadConfigFromMobileHubFile: true,

  // Controls if it should load minimized production dependecies
  // set to true for production
  // NODE_ENV is injected at build time by webpack DefinePlugin
  shouldLoadMinDeps: "development" === 'production'
};

/**
 * Default full page specific loader options
 */
var optionsFullPage = exports.optionsFullPage = (0, _extends3.default)({}, options, {

  // DOM element ID where the chatbot UI will be mounted
  elementId: 'lex-web-ui-fullpage'
});

/**
 * Default iframe specific loader options
 */
var optionsIframe = exports.optionsIframe = (0, _extends3.default)({}, options, {

  // DOM element ID where the chatbot UI will be mounted
  elementId: 'lex-web-ui-iframe',

  // div container class to insert iframe
  containerClass: 'lex-web-ui-iframe',

  // iframe source path. this is appended to the iframeOrigin
  // must use the LexWebUiEmbed=true query string to enable embedded mode
  iframeSrcPath: '/index.html#/?lexWebUiEmbed=true'
});

/***/ }),

/***/ "./index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatBotUiLoader = exports.IframeLoader = exports.FullPageLoader = undefined;

var _extends2 = __webpack_require__("../../../node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__("../../../node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = __webpack_require__("../../../node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__("../../../node_modules/babel-runtime/helpers/get.js");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__("../../../node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = __webpack_require__("../../../node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("../../../node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _lexWebUi = __webpack_require__("./defaults/lex-web-ui.js");

var _loader = __webpack_require__("./defaults/loader.js");

var _dependencies = __webpack_require__("./defaults/dependencies.js");

var _dependencyLoader = __webpack_require__("./lib/dependency-loader.js");

var _configLoader = __webpack_require__("./lib/config-loader.js");

var _iframeComponentLoader = __webpack_require__("./lib/iframe-component-loader.js");

var _fullpageComponentLoader = __webpack_require__("./lib/fullpage-component-loader.js");

__webpack_require__("../css/lex-web-ui-fullpage.css");

__webpack_require__("../css/lex-web-ui-iframe.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * CustomEvent polyfill for IE11
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
 */


// import CSS


// import from lib
function setCustomEventShim() {
  if (typeof window.CustomEvent === 'function') {
    return false;
  }

  function CustomEvent(event) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { bubbles: false, cancelable: false, detail: undefined };

    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;

  return true;
}

/**
 * Base class used by the full page and iframe loaders
 */
/*
 Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

/**
 * Entry point to the chatbot-ui-loader.js library
 * Exports the loader classes
 */

// import default config
// import { configIframe, configFullPage } from './defaults/lex-web-ui';

var Loader = function () {
  /**
   * @param {object} options - options controlling how the dependencies and
   *   component configa are loaded
   */
  function Loader(options) {
    (0, _classCallCheck3.default)(this, Loader);
    var baseUrl = options.baseUrl;
    // polyfill needed for IE11

    setCustomEventShim();
    this.options = options;

    // append a trailing slash if not present in the baseUrl
    this.options.baseUrl = this.options.baseUrl && baseUrl[baseUrl.length - 1] === '/' ? this.options.baseUrl : this.options.baseUrl + '/';

    this.confLoader = new _configLoader.ConfigLoader(this.options);
  }

  (0, _createClass3.default)(Loader, [{
    key: 'load',
    value: function load() {
      var _this = this;

      var configParam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // merge empty constructor config and parameter config
      this.config = _configLoader.ConfigLoader.mergeConfig(this.config, configParam);

      // load dependencies
      return this.depLoader.load()
      // load dynamic config
      .then(function () {
        return _this.confLoader.load(_this.config);
      })
      // assign and merge dynamic config to this instance config
      .then(function (config) {
        _this.config = _configLoader.ConfigLoader.mergeConfig(_this.config, config);
      }).then(function () {
        return _this.compLoader.load(_this.config);
      });
    }
  }]);
  return Loader;
}();

/**
 * Class used to to dynamically load the chatbot ui in a full page including its
 * dependencies and config
 */


var FullPageLoader = exports.FullPageLoader = function (_Loader) {
  (0, _inherits3.default)(FullPageLoader, _Loader);

  /**
   * @param {object} options - options controlling how the dependencies and
   *   component config are loaded
   */
  function FullPageLoader() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, FullPageLoader);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (FullPageLoader.__proto__ || (0, _getPrototypeOf2.default)(FullPageLoader)).call(this, (0, _extends3.default)({}, _loader.optionsFullPage, options)));

    _this2.config = _lexWebUi.configBase;

    // run-time dependencies
    _this2.depLoader = new _dependencyLoader.DependencyLoader({
      shouldLoadMinDeps: _this2.options.shouldLoadMinDeps,
      dependencies: _dependencies.dependenciesFullPage,
      baseUrl: _this2.options.baseUrl
    });

    _this2.compLoader = new _fullpageComponentLoader.FullPageComponentLoader({
      elementId: _this2.options.elementId,
      config: _this2.config
    });
    return _this2;
  }

  (0, _createClass3.default)(FullPageLoader, [{
    key: 'load',
    value: function load() {
      var configParam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return (0, _get3.default)(FullPageLoader.prototype.__proto__ || (0, _getPrototypeOf2.default)(FullPageLoader.prototype), 'load', this).call(this, configParam);
    }
  }]);
  return FullPageLoader;
}(Loader);

/**
 * Class used to to dynamically load the chatbot ui in an iframe
 */


var IframeLoader = exports.IframeLoader = function (_Loader2) {
  (0, _inherits3.default)(IframeLoader, _Loader2);

  /**
   * @param {object} options - options controlling how the dependencies and
   *   component config are loaded
   */
  function IframeLoader() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, IframeLoader);

    // chatbot UI component config
    var _this3 = (0, _possibleConstructorReturn3.default)(this, (IframeLoader.__proto__ || (0, _getPrototypeOf2.default)(IframeLoader)).call(this, (0, _extends3.default)({}, _loader.optionsIframe, options)));

    _this3.config = _lexWebUi.configBase;

    // run-time dependencies
    _this3.depLoader = new _dependencyLoader.DependencyLoader({
      shouldLoadMinDeps: _this3.options.shouldLoadMinDeps,
      dependencies: _dependencies.dependenciesIframe,
      baseUrl: _this3.options.baseUrl
    });

    _this3.compLoader = new _iframeComponentLoader.IframeComponentLoader({
      config: _this3.config,
      containerClass: _this3.options.containerClass || 'lex-web-ui',
      elementId: _this3.options.elementId || 'lex-web-ui'
    });
    return _this3;
  }

  (0, _createClass3.default)(IframeLoader, [{
    key: 'load',
    value: function load() {
      var _this4 = this;

      var configParam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.config.iframe = this.config.iframe || {};
      this.config.iframe.iframeSrcPath = this.mergeSrcPath(configParam);

      return (0, _get3.default)(IframeLoader.prototype.__proto__ || (0, _getPrototypeOf2.default)(IframeLoader.prototype), 'load', this).call(this, configParam).then(function () {
        // assign API to this object to make calls more succint
        _this4.api = _this4.compLoader.api;
      });
    }

    /**
     * Merges iframe src path from options and iframe config
     */

  }, {
    key: 'mergeSrcPath',
    value: function mergeSrcPath(configParam) {
      var iframeConfigFromParam = configParam.iframe;

      var srcPathFromParam = iframeConfigFromParam && iframeConfigFromParam.iframeSrcPath;
      var iframeConfigFromThis = this.config.iframe;

      var srcPathFromThis = iframeConfigFromThis && iframeConfigFromThis.iframeSrcPath;

      return srcPathFromParam || this.options.iframeSrcPath || srcPathFromThis;
    }
  }]);
  return IframeLoader;
}(Loader);

/**
 * chatbot loader library entry point
 */


var ChatBotUiLoader = exports.ChatBotUiLoader = {
  FullPageLoader: FullPageLoader,
  IframeLoader: IframeLoader
};

exports.default = ChatBotUiLoader;

/***/ }),

/***/ "./lib/config-loader.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigLoader = undefined;

var _typeof2 = __webpack_require__("../../../node_modules/babel-runtime/helpers/typeof.js");

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = __webpack_require__("../../../node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _keys = __webpack_require__("../../../node_modules/babel-runtime/core-js/object/keys.js");

var _keys2 = _interopRequireDefault(_keys);

var _promise = __webpack_require__("../../../node_modules/babel-runtime/core-js/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = __webpack_require__("../../../node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("../../../node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _loader = __webpack_require__("./defaults/loader.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Config loader class
 *
 * Loads the chatbot UI config from the following sources in order of precedence:
 * (lower overrides higher):
 *   1. parameter passed to load()
 *   2. Event (loadlexconfig)
 *   3. Mobile HUB
 *   4. JSON file
 *   TODO implement passing config in url param
 */

var ConfigLoader = exports.ConfigLoader = function () {
  function ConfigLoader() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _loader.options;
    (0, _classCallCheck3.default)(this, ConfigLoader);

    this.options = options;
    this.config = {};
  }

  /**
   * Loads the config from the supported the sources
   *
   * Config is sequentially merged
   *
   * Returns a promise that resolves to the merged config
   */


  (0, _createClass3.default)(ConfigLoader, [{
    key: 'load',
    value: function load() {
      var _this = this;

      var configParam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return _promise2.default.resolve()
      // json file
      .then(function () {
        if (_this.options.shouldLoadConfigFromJsonFile) {
          // append baseUrl to config if it's relative
          var url = _this.options.configUrl.startsWith('http') ? _this.options.configUrl : '' + _this.options.baseUrl + _this.options.configUrl;
          return ConfigLoader.loadJsonFile(url);
        }
        return _promise2.default.resolve({});
      })
      // mobile hub
      .then(function (mergedConfigFromJson) {
        return _this.options.shouldLoadConfigFromMobileHubFile ? ConfigLoader.mergeMobileHubConfig(mergedConfigFromJson) : _promise2.default.resolve(mergedConfigFromJson);
      })
      // event
      .then(function (mergedConfigFromMobileHub) {
        return _this.options.shouldLoadConfigFromEvent ? ConfigLoader.loadConfigFromEvent(mergedConfigFromMobileHub, _this.options.configEventTimeoutInMs) : _promise2.default.resolve(mergedConfigFromMobileHub);
      })
      // filter config when running embedded
      .then(function (mergedConfigFromEvent) {
        return _this.filterConfigWhenEmedded(mergedConfigFromEvent);
      })
      // merge config from parameter
      .then(function (config) {
        return ConfigLoader.mergeConfig(config, configParam);
      });
    }

    /**
     * Loads the config from a JSON file URL
     */

  }, {
    key: 'filterConfigWhenEmedded',


    /**
     * Ignores most fields when running embeded and the
     * shouldIgnoreConfigWhenEmbedded is set to true
     */
    value: function filterConfigWhenEmedded(config) {
      var url = window.location.href;
      // when shouldIgnoreConfigEmbedded is true
      // ignore most of the config with the exception of the parentOrigin
      var parentOrigin = config.ui && config.ui.parentOrigin;
      return this.options && this.options.shouldIgnoreConfigWhenEmbedded && url.includes('lexWebUiEmbed=true') ? { ui: { parentOrigin: parentOrigin } } : config;
    }

    /**
     * Merges config objects. The initial set of keys to merge are driven by
     * the baseConfig. The srcConfig values override the baseConfig ones
     * unless the srcConfig value is empty
     */

  }], [{
    key: 'loadJsonFile',
    value: function loadJsonFile(url) {
      return new _promise2.default(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onerror = function () {
          return reject(new Error('error getting chatbot UI config from url: ' + url));
        };
        xhr.onload = function () {
          if (xhr.status !== 200) {
            var err = 'failed to get chatbot config with status: ' + xhr.status;
            return reject(new Error(err));
          }
          // ie11 does not support responseType
          if (typeof xhr.response === 'string') {
            try {
              var parsedResponse = JSON.parse(xhr.response);
              return resolve(parsedResponse);
            } catch (err) {
              return reject(new Error('failed to decode chatbot UI config object'));
            }
          }
          return resolve(xhr.response);
        };
        xhr.send();
      });
    }

    /**
     * Merges config with Mobile Hub variables
     *
     * Grabs the Cognito Pool Id and Bot name from the
     * aws_cognito_identity_pool_id and aws_bots_config global variables.
     * These variables are normally set by the 'aws-config.js' script.
     *
     * Returns a promise that resolves to the merge between the
     * Mobile Hub variables and the config parameter
     */

  }, {
    key: 'mergeMobileHubConfig',
    value: function mergeMobileHubConfig(config) {
      // these values come from the AWS Mobile Hub generated aws-config.js
      // eslint-disable-next-line camelcase
      if (!aws_cognito_identity_pool_id || !aws_bots_config) {
        return _promise2.default.resolve(config);
      }

      return new _promise2.default(function (resolve, reject) {
        var botName = '';
        var botRegion = '';

        try {
          var botsConfig = JSON.parse(aws_bots_config);
          botName = botsConfig[0].name;
          botRegion = botsConfig[0].region;
        } catch (err) {
          return reject(new Error('failed to parse mobile hub aws_bots_config'));
        }

        var mobileHubConfig = {
          cognito: {
            poolId: aws_cognito_identity_pool_id,
            // eslint-disable-next-line camelcase
            region: aws_cognito_region || 'us-east-1'
          },
          lex: { botName: botName },
          region: botRegion || 'us-east-1'
        };

        var mergedConfig = ConfigLoader.mergeConfig(config, mobileHubConfig);

        return resolve(mergedConfig);
      });
    }

    /**
     * Loads dynamic bot config from an event
     * Merges it with the config passed as parameter
     */

  }, {
    key: 'loadConfigFromEvent',
    value: function loadConfigFromEvent(config) {
      var timeoutInMs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10000;

      var eventManager = {
        intervalId: null,
        timeoutId: null,
        onConfigEventLoaded: null,
        onConfigEventTimeout: null
      };

      return new _promise2.default(function (resolve, reject) {
        eventManager.onConfigEventLoaded = function (evt) {
          clearTimeout(eventManager.timeoutId);
          clearInterval(eventManager.intervalId);
          document.removeEventListener('loadlexconfig', eventManager.onConfigEventLoaded, false);

          if (evt && 'detail' in evt && evt.detail && 'config' in evt.detail) {
            var evtConfig = evt.detail.config;
            var mergedConfig = ConfigLoader.mergeConfig(config, evtConfig);
            return resolve(mergedConfig);
          }
          return reject(new Error('malformed config in event'));
        };

        eventManager.onConfigEventTimeout = function () {
          clearInterval(eventManager.intervalId);
          document.removeEventListener('loadlexconfig', eventManager.onConfigEventLoaded, false);
          return reject(new Error('config event timed out'));
        };

        eventManager.timeoutId = setTimeout(eventManager.onConfigEventTimeout, timeoutInMs);
        document.addEventListener('loadlexconfig', eventManager.onConfigEventLoaded, false);

        // signal that we are ready to receive the dynamic config
        // on an interval of 1/2 a second
        eventManager.intervalId = setInterval(function () {
          return document.dispatchEvent(new CustomEvent('receivelexconfig'));
        }, 500);
      });
    }
  }, {
    key: 'mergeConfig',
    value: function mergeConfig(baseConfig) {
      var srcConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      function isEmpty(data) {
        if (typeof data === 'number' || typeof data === 'boolean') {
          return false;
        }
        if (typeof data === 'undefined' || data === null) {
          return true;
        }
        if (typeof data.length !== 'undefined') {
          return data.length === 0;
        }
        return (0, _keys2.default)(data).length === 0;
      }

      if (isEmpty(srcConfig)) {
        return (0, _extends3.default)({}, baseConfig);
      }

      // use the baseConfig first level keys as the base for merging
      return (0, _keys2.default)(baseConfig).map(function (key) {
        var mergedConfig = {};
        var value = baseConfig[key];
        // merge from source if its value is not empty
        if (key in srcConfig && !isEmpty(srcConfig[key])) {
          value = (0, _typeof3.default)(baseConfig[key]) === 'object' ?
          // recursively merge sub-objects in both directions
          (0, _extends3.default)({}, ConfigLoader.mergeConfig(srcConfig[key], baseConfig[key]), ConfigLoader.mergeConfig(baseConfig[key], srcConfig[key])) : srcConfig[key];
        }
        mergedConfig[key] = value;
        return mergedConfig;
      })
      // merge key values back into a single object
      .reduce(function (merged, configItem) {
        return (0, _extends3.default)({}, merged, configItem);
      }, {});
    }
  }]);
  return ConfigLoader;
}(); /*
      Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
     
      Licensed under the Amazon Software License (the "License"). You may not use this file
      except in compliance with the License. A copy of the License is located at
     
      http://aws.amazon.com/asl/
     
      or in the "license" file accompanying this file. This file is distributed on an "AS IS"
      BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
      License for the specific language governing permissions and limitations under the License.
      */

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* global aws_bots_config aws_cognito_identity_pool_id aws_cognito_region */

exports.default = ConfigLoader;

/***/ }),

/***/ "./lib/dependency-loader.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DependencyLoader = undefined;

var _promise = __webpack_require__("../../../node_modules/babel-runtime/core-js/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = __webpack_require__("../../../node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("../../../node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

/**
 * Dependency loader class
 *
 * Used to dynamically load external JS/CSS dependencies into the DOM
 */
var DependencyLoader = exports.DependencyLoader = function () {
  /**
   * @param {boolean} shouldLoadMinDeps - controls whether the minimized
   *   version of a dependency should be loaded. Default: true.
   *
   * @param {boolean} baseUrl - sets the baseUrl to be prepended to relative
   *   URLs. Default: '/'
   *
   * @param {object} dependencies - contains a field for scripts and css
   *   dependencies. Each field points to an array of objects containing
   *   the dependency definition. The order of array dictates the load sequence.
   *
   *   Each object in the array may contain the following fields:
   *   - name: [required] For scripts, it points to a variable in global
   *     namespace indicating if the script is loaded. It is also used in the
   *     element id
   *   - url: [required] URL where the dependency is loaded
   *   - optional: When set to true, load errors are ignored. Otherwise, if set
   *     to false, the dependency load chain fails
   *   - canUseMin: When set to true, it attempts to load the min version of a
   *     dependency by prepending 'min' before the file extension.
   *
   *   Example:
   *   dependencies = {
   *     'script': [
   *       {
   *         name: 'Vuetify',
   *         url: 'https://unpkg.com/vuetify/dist/vuetify.js',
   *         optional: false,
   *         canUseMin: true,
   *       },
   *     ],
   *     'css': [
   *       {
   *         name: 'vuetify',
   *         url: 'https://unpkg.com/vuetify/dist/vuetify.css',
   *         canUseMin: true,
   *       },
   *     ],
   *   };
   */
  function DependencyLoader(_ref) {
    var _ref$shouldLoadMinDep = _ref.shouldLoadMinDeps,
        shouldLoadMinDeps = _ref$shouldLoadMinDep === undefined ? true : _ref$shouldLoadMinDep,
        dependencies = _ref.dependencies,
        _ref$baseUrl = _ref.baseUrl,
        baseUrl = _ref$baseUrl === undefined ? '/' : _ref$baseUrl;
    (0, _classCallCheck3.default)(this, DependencyLoader);

    if (typeof shouldLoadMinDeps !== 'boolean') {
      throw new Error('useMin paramenter should be a boolean');
    }
    if (!('css' in dependencies) || !Array.isArray(dependencies.css)) {
      throw new Error('missing or invalid css field in dependency parameter');
    }
    if (!('script' in dependencies) || !Array.isArray(dependencies.script)) {
      throw new Error('missing or invalid script field in dependency parameter');
    }
    this.useMin = shouldLoadMinDeps;
    this.dependencies = dependencies;
    this.baseUrl = baseUrl;
  }

  /**
   * Sequentially loads the dependencies
   *
   * Returns a promise that resolves if all dependencies are successfully
   * loaded or rejected if one fails (unless the dependency is optional).
   */


  (0, _createClass3.default)(DependencyLoader, [{
    key: 'load',
    value: function load() {
      var _this = this;

      var types = ['css', 'script'];

      return types.reduce(function (typePromise, type) {
        return _this.dependencies[type].reduce(function (loadPromise, dependency) {
          return loadPromise.then(function () {
            return DependencyLoader.addDependency(_this.useMin, _this.baseUrl, type, dependency);
          });
        }, typePromise);
      }, _promise2.default.resolve());
    }

    /**
     * Inserts `.min` in URLs before extension
     */

  }], [{
    key: 'getMinUrl',
    value: function getMinUrl(url) {
      var lastDotPosition = url.lastIndexOf('.');
      if (lastDotPosition === -1) {
        return url + '.min';
      }
      return url.substring(0, lastDotPosition) + '.min' + url.substring(lastDotPosition);
    }

    /**
     * Builds the parameters used to add attributes to the tag
     */

  }, {
    key: 'getTypeAttributes',
    value: function getTypeAttributes(type) {
      switch (type) {
        case 'script':
          return {
            elAppend: document.body,
            tag: 'script',
            typeAttrib: 'text/javascript',
            srcAttrib: 'src'
          };
        case 'css':
          return {
            elAppend: document.head,
            tag: 'link',
            typeAttrib: 'text/css',
            srcAttrib: 'href'
          };
        default:
          return {};
      }
    }

    /**
     * Adds a JS/CSS dependency to the DOM
     *
     * Adds a script or link tag to dynamically load the JS/CSS dependency
     * Avoids adding script tags if the associated name exists in the global scope
     * or if the associated element id exists.
     *
     * Returns a promise that resolves when the dependency is loaded
     */

  }, {
    key: 'addDependency',
    value: function addDependency() {
      var useMin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var baseUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';
      var type = arguments[2];
      var dependency = arguments[3];

      if (!['script', 'css'].includes(type)) {
        return _promise2.default.reject(new Error('invalid dependency type: ' + type));
      }
      if (!dependency || !dependency.name || !dependency.url) {
        return _promise2.default.reject(new Error('invalid dependency parameter: ' + dependency));
      }

      // load fails after this timeout
      var loadTimeoutInMs = 10000;

      // For scripts, name is used to check if the dependency global variable exist
      // it is also used to build the element id of the HTML tag
      var name = dependency.name;

      if (type === 'script' && name in window) {
        console.warn('script global variable ' + name + ' seems to already exist');
        return _promise2.default.resolve();
      }

      // dependency url - can be automatically changed to a min link
      var minUrl = useMin && dependency.canUseMin ? DependencyLoader.getMinUrl(dependency.url) : dependency.url;

      // add base URL to relative URLs
      var url = minUrl.startsWith('http') ? minUrl : '' + baseUrl + minUrl;

      // element id - uses naming convention of <lower case name>-<type>
      var elId = String(name).toLowerCase() + '-' + type;
      if (document.getElementById(elId)) {
        console.warn('dependency tag for ' + name + ' seems to already exist');
        return _promise2.default.resolve();
      }

      var _DependencyLoader$get = DependencyLoader.getTypeAttributes(type),
          elAppend = _DependencyLoader$get.elAppend,
          typeAttrib = _DependencyLoader$get.typeAttrib,
          srcAttrib = _DependencyLoader$get.srcAttrib,
          tag = _DependencyLoader$get.tag;

      if (!elAppend || !elAppend.appendChild) {
        return _promise2.default.reject(new Error('invalid append element'));
      }

      return new _promise2.default(function (resolve, reject) {
        var el = document.createElement(tag);

        el.setAttribute('id', elId);
        el.setAttribute('type', typeAttrib);

        var timeoutId = setTimeout(function () {
          return reject(new Error('timed out loading ' + name + ' dependency link: ' + url));
        }, loadTimeoutInMs);
        el.onerror = function () {
          if (dependency.optional) {
            return resolve(el);
          }
          return reject(new Error('failed to load ' + name + ' dependency link: ' + url));
        };
        el.onload = function () {
          clearTimeout(timeoutId);
          return resolve(el);
        };

        try {
          if (type === 'css') {
            el.setAttribute('rel', 'stylesheet');
          }
          el.setAttribute(srcAttrib, url);

          if (type === 'script') {
            // links appended towards the bottom
            elAppend.appendChild(el);
          } else if (type === 'css') {
            // css inserted before other links to allow overriding
            var linkEl = elAppend.querySelector('link');
            elAppend.insertBefore(el, linkEl);
          }
        } catch (err) {
          return reject(new Error('failed to add ' + name + ' dependency: ' + err));
        }

        return el;
      });
    }
  }]);
  return DependencyLoader;
}();

exports.default = DependencyLoader;

/***/ }),

/***/ "./lib/fullpage-component-loader.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FullPageComponentLoader = undefined;

var _promise = __webpack_require__("../../../node_modules/babel-runtime/core-js/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = __webpack_require__("../../../node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("../../../node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _configLoader = __webpack_require__("./lib/config-loader.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Instantiates and mounts the chatbot component
 *
 * Assumes that the LexWebUi and Vue libraries have been loaded in the global
 * scope
 */
var FullPageComponentLoader = exports.FullPageComponentLoader = function () {
  /**
   * @param {string} elementId - element ID where the chatbot UI component
   *   will be mounted
   * @param {object} config - chatbot UI config
   */
  function FullPageComponentLoader(_ref) {
    var _ref$elementId = _ref.elementId,
        elementId = _ref$elementId === undefined ? 'lex-web-ui' : _ref$elementId,
        _ref$config = _ref.config,
        config = _ref$config === undefined ? {} : _ref$config;
    (0, _classCallCheck3.default)(this, FullPageComponentLoader);

    this.elementId = elementId;
    this.config = config;
  }

  /**
   * Loads the component into the DOM
   * configParam overrides at runtime the chatbot UI config
   */


  (0, _createClass3.default)(FullPageComponentLoader, [{
    key: 'load',
    value: function load(configParam) {
      var _this = this;

      var mergedConfig = _configLoader.ConfigLoader.mergeConfig(this.config, configParam);

      return FullPageComponentLoader.createComponent(mergedConfig).then(function (lexWebUi) {
        return FullPageComponentLoader.mountComponent(_this.elementId, lexWebUi);
      });
    }

    /**
     * Instantiates the LexWebUi component
     *
     * Returns a promise that resolves to the component
     */

  }], [{
    key: 'createComponent',
    value: function createComponent() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new _promise2.default(function (resolve, reject) {
        try {
          var lexWebUi = new LexWebUi.Loader(config);
          return resolve(lexWebUi);
        } catch (err) {
          return reject(new Error('failed to load LexWebUi: ' + err));
        }
      });
    }

    /**
     * Mounts the chatbot component in the DOM at the provided element ID
     * Returns a promise that resolves when the component is mounted
     */

  }, {
    key: 'mountComponent',
    value: function mountComponent() {
      var elId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'lex-web-ui';
      var lexWebUi = arguments[1];

      if (!lexWebUi) {
        throw new Error('lexWebUi not set');
      }
      return new _promise2.default(function (resolve, reject) {
        var el = document.getElementById(elId);

        // if the element doesn't exist, create a div and append it
        // to the document body
        if (!el) {
          el = document.createElement('div');
          el.setAttribute('id', elId);
          document.body.appendChild(el);
        }

        try {
          var LexWebUiComponent = Vue.extend({
            store: lexWebUi.store,
            template: '<div id="lex-web-ui"><lex-web-ui/></div>'
          });

          // mounts off-document
          var lexWebUiComponent = new LexWebUiComponent().$mount();
          // replace existing element
          el.parentNode.replaceChild(lexWebUiComponent.$el, el);
          resolve(lexWebUiComponent);
        } catch (err) {
          reject(new Error('failed to mount lexWebUi component: ' + err));
        }
      });
    }
  }]);
  return FullPageComponentLoader;
}(); /*
      Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
     
      Licensed under the Amazon Software License (the "License"). You may not use this file
      except in compliance with the License. A copy of the License is located at
     
      http://aws.amazon.com/asl/
     
      or in the "license" file accompanying this file. This file is distributed on an "AS IS"
      BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
      License for the specific language governing permissions and limitations under the License.
      */

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* global LexWebUi Vue */


exports.default = FullPageComponentLoader;

/***/ }),

/***/ "./lib/iframe-component-loader.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IframeComponentLoader = undefined;

var _promise = __webpack_require__("../../../node_modules/babel-runtime/core-js/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = __webpack_require__("../../../node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("../../../node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _configLoader = __webpack_require__("./lib/config-loader.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Instantiates and mounts the chatbot component in an iframe
 *
 */
var IframeComponentLoader = exports.IframeComponentLoader = function () {
  /**
   * @param {object} config - chatbot UI config
   * @param {string} elementId - element ID of a div containing the iframe
   * @param {string} containerClass - base CSS class used to match element
   *   used for dynamicall hiding/showing element
   */
  function IframeComponentLoader(_ref) {
    var _ref$config = _ref.config,
        config = _ref$config === undefined ? {} : _ref$config,
        _ref$containerClass = _ref.containerClass,
        containerClass = _ref$containerClass === undefined ? 'lex-web-ui' : _ref$containerClass,
        _ref$elementId = _ref.elementId,
        elementId = _ref$elementId === undefined ? 'lex-web-ui' : _ref$elementId;
    (0, _classCallCheck3.default)(this, IframeComponentLoader);

    this.elementId = elementId;
    this.config = config;
    this.containerClass = containerClass;

    this.iframeElement = null;
    this.containerElement = null;
    this.credentials = null;
    this.isChatBotReady = false;

    this.initIframeMessageHandlers();
  }

  /**
   * Loads the component into the DOM
   * configParam overrides at runtime the chatbot UI config
   */


  (0, _createClass3.default)(IframeComponentLoader, [{
    key: 'load',
    value: function load(configParam) {
      var _this = this;

      this.config = _configLoader.ConfigLoader.mergeConfig(this.config, configParam);

      // add iframe config if missing
      if (!('iframe' in this.config)) {
        this.config.iframe = {};
      }
      var iframeConfig = this.config.iframe;
      // assign the iframeOrigin if not found in config
      if (!('iframeOrigin' in iframeConfig && iframeConfig.iframeOrigin)) {
        this.config.iframe.iframeOrigin = this.config.parentOrigin || window.location.origin;
      }
      // assign parentOrigin if not found in config
      if (!this.config.parentOrigin) {
        this.config.parentOrigin = this.config.iframe.iframeOrigin || window.location.origin;
      }
      // validate config
      if (!IframeComponentLoader.validateConfig(this.config)) {
        return _promise2.default.reject(new Error('config object is missing required fields'));
      }

      return _promise2.default.all([this.initContainer(), this.initCognitoCredentials(), this.setupIframeMessageListener()]).then(function () {
        return _this.initIframe();
      }).then(function () {
        return _this.initParentToIframeApi();
      }).then(function () {
        return _this.showIframe();
      });
    }

    /**
     * Validate that the config has the expected structure
     */

  }, {
    key: 'initContainer',


    /**
     * Adds a div container to document body which will hold the chatbot iframe
     * Inits this.containerElement
     */
    value: function initContainer() {
      var _this2 = this;

      return new _promise2.default(function (resolve, reject) {
        if (!_this2.elementId || !_this2.containerClass) {
          return reject(new Error('invalid chatbot container parameters'));
        }
        var containerEl = document.getElementById(_this2.elementId);
        if (containerEl) {
          console.warn('chatbot iframe container already exists');
          return resolve(containerEl);
        }
        try {
          containerEl = document.createElement('div');
          containerEl.classList.add(_this2.containerClass);
          containerEl.setAttribute('id', _this2.elementId);
          document.body.appendChild(containerEl);
        } catch (err) {
          return reject(new Error('error initializing container: ' + err));
        }

        // assign container element
        _this2.containerElement = containerEl;
        return resolve();
      });
    }

    /**
     * Creates Cognito credentials
     * Inits this.credentials
     */

  }, {
    key: 'initCognitoCredentials',
    value: function initCognitoCredentials() {
      var _this3 = this;

      return new _promise2.default(function (resolve, reject) {
        var cognitoPoolId = _this3.config.cognito.poolId;

        var region = _this3.config.cognito.region || _this3.config.region || 'us-east-1';
        if (!cognitoPoolId) {
          return reject(new Error('missing cognito poolId config'));
        }

        if (!('AWS' in window) || !('CognitoIdentityCredentials' in window.AWS)) {
          return reject(new Error('unable to find AWS SDK global object'));
        }

        var credentials = void 0;
        try {
          credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: cognitoPoolId }, { region: region });
        } catch (err) {
          reject(new Error('cognito credentials could not be created ' + err));
        }

        // get and assign credentials
        return credentials.getPromise().then(function () {
          _this3.credentials = credentials;
          resolve();
        });
      });
    }

    /**
     * Add postMessage event handler to receive messages from iframe
     */

  }, {
    key: 'setupIframeMessageListener',
    value: function setupIframeMessageListener() {
      try {
        window.addEventListener('message', this.onMessageFromIframe.bind(this), false);
      } catch (err) {
        return _promise2.default.reject(new Error('could not add iframe message listener ' + err));
      }

      return _promise2.default.resolve();
    }

    /**
     * Message handler - receives postMessage events from iframe
     */

  }, {
    key: 'onMessageFromIframe',
    value: function onMessageFromIframe(evt) {
      var iframeOrigin = 'iframe' in this.config && typeof this.config.iframe.iframeOrigin === 'string' ? this.config.iframe.iframeOrigin : window.location.origin;

      // SECURITY: origin check
      if (evt.origin !== iframeOrigin) {
        console.warn('postMessage from invalid origin', evt.origin);
        return;
      }
      if (!evt.ports || !Array.isArray(evt.ports) || !evt.ports.length) {
        console.warn('postMessage not sent over MessageChannel', evt);
        return;
      }
      if (!this.iframeMessageHandlers) {
        console.error('invalid iframe message handler');
        return;
      }

      if (!evt.data.event) {
        console.error('event from iframe does not have the event field', evt);
        return;
      }

      // SECURITY: validate that a message handler is defined as a property
      // and not inherited
      var hasMessageHandler = Object.prototype.hasOwnProperty.call(this.iframeMessageHandlers, evt.data.event);
      if (!hasMessageHandler) {
        console.error('unknown message in event', evt.data);
        return;
      }

      // calls event handler and dynamically bind this
      this.iframeMessageHandlers[evt.data.event].call(this, evt);
    }

    /**
     * Adds chat bot iframe under the application div container
     * Inits this.iframeElement
     */

  }, {
    key: 'initIframe',
    value: function initIframe() {
      var _this4 = this;

      var _config$iframe = this.config.iframe,
          iframeOrigin = _config$iframe.iframeOrigin,
          iframeSrcPath = _config$iframe.iframeSrcPath;

      if (!iframeOrigin || !iframeSrcPath) {
        return _promise2.default.reject(new Error('invalid iframe url fields'));
      }
      var url = '' + iframeOrigin + iframeSrcPath;
      if (!url) {
        return _promise2.default.reject(new Error('invalid iframe url'));
      }
      if (!this.containerElement || !('appendChild' in this.containerElement)) {
        return _promise2.default.reject(new Error('invalid node element to append iframe'));
      }
      var iframeElement = this.containerElement.querySelector('iframe');
      if (iframeElement) {
        return _promise2.default.resolve(iframeElement);
      }

      try {
        iframeElement = document.createElement('iframe');
        iframeElement.setAttribute('src', url);
        iframeElement.setAttribute('frameBorder', '0');
        iframeElement.setAttribute('scrolling', 'no');
        iframeElement.setAttribute('title', 'chatbot');
        // chrome requires this feature policy when using the
        // mic in an cross-origin iframe
        iframeElement.setAttribute('allow', 'microphone');

        this.containerElement.appendChild(iframeElement);
      } catch (err) {
        return _promise2.default.reject(new Error('failed to initialize iframe element ' + err));
      }

      // assign iframe element
      this.iframeElement = iframeElement;
      return this.waitForIframe(iframeElement).then(function () {
        return _this4.waitForChatBotReady();
      });
    }

    /**
     * Waits for iframe to load
     */

  }, {
    key: 'waitForIframe',
    value: function waitForIframe() {
      var _this5 = this;

      var iframeLoadManager = {
        timeoutInMs: 20000,
        timeoutId: null,
        onIframeLoaded: null,
        onIframeTimeout: null
      };

      return new _promise2.default(function (resolve, reject) {
        iframeLoadManager.onIframeLoaded = function () {
          clearTimeout(iframeLoadManager.timeoutId);
          _this5.iframeElement.removeEventListener('load', iframeLoadManager.onIframeLoaded, false);

          return resolve();
        };

        iframeLoadManager.onIframeTimeout = function () {
          _this5.iframeElement.removeEventListener('load', iframeLoadManager.onIframeLoaded, false);

          return reject(new Error('iframe load timeout'));
        };

        iframeLoadManager.timeoutId = setTimeout(iframeLoadManager.onIframeTimeout, iframeLoadManager.timeoutInMs);

        _this5.iframeElement.addEventListener('load', iframeLoadManager.onIframeLoaded, false);
      });
    }

    /**
     * Wait for the chatbot UI to set isChatBotReady to true
     * isChatBotReady is set by the event handler when the chatbot
     * UI component signals that it has successfully loaded
     */

  }, {
    key: 'waitForChatBotReady',
    value: function waitForChatBotReady() {
      var _this6 = this;

      var readyManager = {
        timeoutId: null,
        intervalId: null,
        checkIsChtBotReady: null,
        onConfigEventTimeout: null
      };

      return new _promise2.default(function (resolve, reject) {
        var timeoutInMs = 15000;

        readyManager.checkIsChatBotReady = function () {
          // isChatBotReady set by event received from iframe
          if (_this6.isChatBotReady) {
            clearTimeout(readyManager.timeoutId);
            clearInterval(readyManager.intervalId);
            resolve();
          }
        };

        readyManager.onConfigEventTimeout = function () {
          clearInterval(readyManager.intervalId);
          return reject(new Error('chatbot loading time out'));
        };

        readyManager.timeoutId = setTimeout(readyManager.onConfigEventTimeout, timeoutInMs);

        readyManager.intervalId = setInterval(readyManager.checkIsChatBotReady, 500);
      });
    }

    /**
     * Get AWS credentials to pass to the chatbot UI
     */

  }, {
    key: 'getCredentials',
    value: function getCredentials() {
      var _this7 = this;

      if (!this.credentials || !('getPromise' in this.credentials)) {
        return _promise2.default.reject(new Error('invalid credentials'));
      }

      return this.credentials.getPromise().then(function () {
        return _this7.credentials;
      });
    }

    /**
     * Event handler functions for messages from iframe
     * Used by onMessageFromIframe - "this" object is bound dynamically
     */

  }, {
    key: 'initIframeMessageHandlers',
    value: function initIframeMessageHandlers() {
      this.iframeMessageHandlers = {
        // signals to the parent that the iframe component is loaded and its
        // API handler is ready
        ready: function ready(evt) {
          this.isChatBotReady = true;
          evt.ports[0].postMessage({ event: 'resolve', type: evt.data.event });
        },


        // requests credentials from the parent
        getCredentials: function getCredentials(evt) {
          return this.getCredentials().then(function (creds) {
            return evt.ports[0].postMessage({
              event: 'resolve',
              type: evt.data.event,
              data: creds
            });
          }).catch(function (error) {
            console.error('failed to get credentials', error);
            evt.ports[0].postMessage({
              event: 'reject',
              type: evt.data.event,
              error: 'failed to get credentials'
            });
          });
        },


        // requests chatbot UI config
        initIframeConfig: function initIframeConfig(evt) {
          evt.ports[0].postMessage({
            event: 'resolve',
            type: evt.data.event,
            data: this.config
          });
        },


        // sent when minimize button is pressed within the iframe component
        toggleMinimizeUi: function toggleMinimizeUi(evt) {
          this.toggleMinimizeUiClass().then(function () {
            return evt.ports[0].postMessage({ event: 'resolve', type: evt.data.event });
          }).catch(function (error) {
            console.error('failed to toggleMinimizeUi', error);
            evt.ports[0].postMessage({
              event: 'reject',
              type: evt.data.event,
              error: 'failed to toggleMinimizeUi'
            });
          });
        },


        // iframe sends Lex updates based on Lex API responses
        updateLexState: function updateLexState(evt) {
          // evt.data will contain the Lex state
          // send resolve ressponse to the chatbot ui
          evt.ports[0].postMessage({ event: 'resolve', type: evt.data.event });

          // relay event to parent
          var stateEvent = new CustomEvent('updatelexstate', { detail: evt.data });
          document.dispatchEvent(stateEvent);
        }
      };
    }

    /**
     * Send a message to the iframe using postMessage
     */

  }, {
    key: 'sendMessageToIframe',
    value: function sendMessageToIframe(message) {
      var _this8 = this;

      if (!this.iframeElement || !('contentWindow' in this.iframeElement) || !('postMessage' in this.iframeElement.contentWindow)) {
        return _promise2.default.reject(new Error('invalid iframe element'));
      }

      var iframeOrigin = this.config.iframe.iframeOrigin;

      if (!iframeOrigin) {
        return _promise2.default.reject(new Error('invalid iframe origin'));
      }

      return new _promise2.default(function (resolve, reject) {
        var messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = function (evt) {
          messageChannel.port1.close();
          messageChannel.port2.close();
          if (evt.data.event === 'resolve') {
            resolve(evt.data);
          } else {
            reject(new Error('iframe failed to handle message - ' + evt.data.error));
          }
        };
        _this8.iframeElement.contentWindow.postMessage(message, iframeOrigin, [messageChannel.port2]);
      });
    }

    /**
     * Toggle between showing/hiding chatbot ui
     */

  }, {
    key: 'toggleShowUiClass',
    value: function toggleShowUiClass() {
      try {
        this.containerElement.classList.toggle(this.containerClass + '--show');
        return _promise2.default.resolve();
      } catch (err) {
        return _promise2.default.reject(new Error('failed to toggle show UI ' + err));
      }
    }

    /**
     * Toggle between miminizing and expanding the chatbot ui
     */

  }, {
    key: 'toggleMinimizeUiClass',
    value: function toggleMinimizeUiClass() {
      try {
        this.containerElement.classList.toggle(this.containerClass + '--minimize');
        return _promise2.default.resolve();
      } catch (err) {
        return _promise2.default.reject(new Error('failed to toggle minimize UI ' + err));
      }
    }

    /**
     * Shows the iframe
     */

  }, {
    key: 'showIframe',
    value: function showIframe() {
      var _this9 = this;

      return _promise2.default.resolve().then(function () {
        return (
          // start minimized if configured accordingly
          _this9.config.iframe.shouldLoadIframeMinimized ? _this9.api.toggleMinimizeUi() : _promise2.default.resolve()
        );
      })
      // display UI
      .then(function () {
        return _this9.toggleShowUiClass();
      });
    }

    /**
     * Event based API handler
     * Receives `lexWebUiMessage` events from the parent and relays
     * to the iframe using postMessage
     */

  }, {
    key: 'onMessageToIframe',
    value: function onMessageToIframe(evt) {
      if (!evt || !('detail' in evt) || !evt.detail || !('message' in evt.detail)) {
        return _promise2.default.reject(new Error('malformed message to iframe event'));
      }
      return this.sendMessageToIframe(evt.detail.message);
    }

    /**
     * Inits the parent to iframe API
     */

  }, {
    key: 'initParentToIframeApi',
    value: function initParentToIframeApi() {
      var _this10 = this;

      this.api = {
        ping: function ping() {
          return _this10.sendMessageToIframe({ event: 'ping' });
        },
        sendParentReady: function sendParentReady() {
          return _this10.sendMessageToIframe({ event: 'parentReady' });
        },
        toggleMinimizeUi: function toggleMinimizeUi() {
          return _this10.sendMessageToIframe({ event: 'toggleMinimizeUi' });
        },
        postText: function postText(message) {
          return _this10.sendMessageToIframe({ event: 'postText', message: message });
        }
      };

      return _promise2.default.resolve().then(function () {
        // Add listener for parent to iframe event based API
        document.addEventListener('lexWebUiMessage', _this10.onMessageToIframe.bind(_this10), false);
      })
      // signal to iframe that the parent is ready
      .then(function () {
        return _this10.api.sendParentReady();
      })
      // signal to parent that the API is ready
      .then(function () {
        document.dispatchEvent(new CustomEvent('lexWebUiReady'));
      });
    }
  }], [{
    key: 'validateConfig',
    value: function validateConfig(config) {
      var iframeConfig = config.iframe;

      if (!iframeConfig) {
        console.error('missing iframe config field');
        return false;
      }
      if (!('iframeOrigin' in iframeConfig && iframeConfig.iframeOrigin)) {
        console.error('missing iframeOrigin config field');
        return false;
      }
      if (!('iframeSrcPath' in iframeConfig && iframeConfig.iframeSrcPath)) {
        console.error('missing iframeSrcPath config field');
        return false;
      }
      if (!('parentOrigin' in config && config.parentOrigin)) {
        console.error('missing parentOrigin config field');
        return false;
      }
      return true;
    }
  }]);
  return IframeComponentLoader;
}(); /*
      Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
     
      Licensed under the Amazon Software License (the "License"). You may not use this file
      except in compliance with the License. A copy of the License is located at
     
      http://aws.amazon.com/asl/
     
      or in the "license" file accompanying this file. This file is distributed on an "AS IS"
      BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
      License for the specific language governing permissions and limitations under the License.
      */

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* global AWS */

exports.default = IframeComponentLoader;

/***/ })

/******/ })["ChatBotUiLoader"];
});
//# sourceMappingURL=lex-web-ui-loader.js.map