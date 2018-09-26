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
/******/ 	var hotCurrentHash = "1bc233e417b9a040f4cb"; // eslint-disable-line no-unused-vars
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

/***/ "../../../node_modules/amazon-cognito-auth-js/es/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: /Users/potterve/Source/aws-lex-web-ui/node_modules/amazon-cognito-auth-js/es/CognitoAccessToken.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * Amazon Cognito Auth SDK for JavaScript
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *         http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file.
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
 * OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions
 * and limitations under the License.
 */

/** @class */
var CognitoAccessToken = function () {
  /**
   * Constructs a new CognitoAccessToken object
   * @param {string=} AccessToken The JWT access token.
   */
  function CognitoAccessToken(AccessToken) {
    _classCallCheck(this, CognitoAccessToken);

    // Assign object
    this.jwtToken = AccessToken || '';
    this.payload = this.decodePayload();
  }

  /**
   * @returns {string} the record's token.
   */


  CognitoAccessToken.prototype.getJwtToken = function getJwtToken() {
    return this.jwtToken;
  };

  /**
   * Sets new value for access token.
   * @param {string=} accessToken The JWT access token.
   * @returns {void}
   */


  CognitoAccessToken.prototype.setJwtToken = function setJwtToken(accessToken) {
    this.jwtToken = accessToken;
  };

  /**
   * @returns {int} the token's expiration (exp member).
   */


  CognitoAccessToken.prototype.getExpiration = function getExpiration() {
    if (this.jwtToken === null) {
      return undefined;
    }
    var jwtPayload = this.jwtToken.split('.')[1];
    return JSON.parse(atob(jwtPayload)).exp;
  };

  /**
   * @returns {string} the username from payload.
   */


  CognitoAccessToken.prototype.getUsername = function getUsername() {
    if (this.jwtToken === null) {
      return undefined;
    }
    var jwtPayload = this.jwtToken.split('.')[1];
    return JSON.parse(atob(jwtPayload)).username;
  };

  /**
   * @returns {object} the token's payload.
   */


  CognitoAccessToken.prototype.decodePayload = function decodePayload() {
    var jwtPayload = this.jwtToken.split('.')[1];
    try {
      return JSON.parse(atob(jwtPayload));
    } catch (err) {
      return {};
    }
  };

  return CognitoAccessToken;
}();

/* harmony default export */ var es_CognitoAccessToken = (CognitoAccessToken);
// CONCATENATED MODULE: /Users/potterve/Source/aws-lex-web-ui/node_modules/amazon-cognito-auth-js/es/CognitoIdToken.js
function CognitoIdToken__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * Amazon Cognito Auth SDK for JavaScript
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *         http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file.
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
 * OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions
 * and limitations under the License.
 */

/** @class */
var CognitoIdToken = function () {
  /**
   * Constructs a new CognitoIdToken object
   * @param {string=} IdToken The JWT Id token
   */
  function CognitoIdToken(IdToken) {
    CognitoIdToken__classCallCheck(this, CognitoIdToken);

    // Assign object
    this.jwtToken = IdToken || '';
    this.payload = this.decodePayload();
  }

  /**
   * @returns {string} the record's token.
   */


  CognitoIdToken.prototype.getJwtToken = function getJwtToken() {
    return this.jwtToken;
  };

  /**
   * Sets new value for id token.
   * @param {string=} idToken The JWT Id token
   * @returns {void}
   */


  CognitoIdToken.prototype.setJwtToken = function setJwtToken(idToken) {
    this.jwtToken = idToken;
  };

  /**
   * @returns {int} the token's expiration (exp member).
   */


  CognitoIdToken.prototype.getExpiration = function getExpiration() {
    if (this.jwtToken === null) {
      return undefined;
    }
    var jwtPayload = this.jwtToken.split('.')[1];
    return JSON.parse(atob(jwtPayload)).exp;
  };

  /**
   * @returns {object} the token's payload.
   */


  CognitoIdToken.prototype.decodePayload = function decodePayload() {
    var jwtPayload = this.jwtToken.split('.')[1];
    try {
      return JSON.parse(atob(jwtPayload));
    } catch (err) {
      return {};
    }
  };

  return CognitoIdToken;
}();

/* harmony default export */ var es_CognitoIdToken = (CognitoIdToken);
// CONCATENATED MODULE: /Users/potterve/Source/aws-lex-web-ui/node_modules/amazon-cognito-auth-js/es/CognitoRefreshToken.js
function CognitoRefreshToken__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * Amazon Cognito Auth SDK for JavaScript
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *         http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file.
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
 * OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions
 * and limitations under the License.
 */

/** @class */
var CognitoRefreshToken = function () {
  /**
   * Constructs a new CognitoRefreshToken object
   * @param {string=} RefreshToken The JWT refresh token.
   */
  function CognitoRefreshToken(RefreshToken) {
    CognitoRefreshToken__classCallCheck(this, CognitoRefreshToken);

    // Assign object
    this.refreshToken = RefreshToken || '';
  }

  /**
   * @returns {string} the record's token.
   */


  CognitoRefreshToken.prototype.getToken = function getToken() {
    return this.refreshToken;
  };

  /**
   * Sets new value for refresh token.
   * @param {string=} refreshToken The JWT refresh token.
   * @returns {void}
   */


  CognitoRefreshToken.prototype.setToken = function setToken(refreshToken) {
    this.refreshToken = refreshToken;
  };

  return CognitoRefreshToken;
}();

/* harmony default export */ var es_CognitoRefreshToken = (CognitoRefreshToken);
// CONCATENATED MODULE: /Users/potterve/Source/aws-lex-web-ui/node_modules/amazon-cognito-auth-js/es/CognitoTokenScopes.js
function CognitoTokenScopes__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * Amazon Cognito Auth SDK for JavaScript
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *         http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file.
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
 * OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions
 * and limitations under the License.
 */

/** @class */
var CognitoTokenScopes = function () {
  /**
   * Constructs a new CognitoTokenScopes object
   * @param {array=} TokenScopesArray The token scopes
   */
  function CognitoTokenScopes(TokenScopesArray) {
    CognitoTokenScopes__classCallCheck(this, CognitoTokenScopes);

    // Assign object
    this.tokenScopes = TokenScopesArray || [];
  }

  /**
   * @returns {Array} the token scopes.
   */


  CognitoTokenScopes.prototype.getScopes = function getScopes() {
    return this.tokenScopes;
  };

  /**
   * Sets new value for token scopes.
   * @param {array=} tokenScopes The token scopes
   * @returns {void}
   */


  CognitoTokenScopes.prototype.setTokenScopes = function setTokenScopes(tokenScopes) {
    this.tokenScopes = tokenScopes;
  };

  return CognitoTokenScopes;
}();

/* harmony default export */ var es_CognitoTokenScopes = (CognitoTokenScopes);
// CONCATENATED MODULE: /Users/potterve/Source/aws-lex-web-ui/node_modules/amazon-cognito-auth-js/es/CognitoAuthSession.js
function CognitoAuthSession__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * Amazon Cognito Auth SDK for JavaScript
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *         http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file.
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
 * OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions
 * and limitations under the License.
 */






/** @class */

var CognitoAuthSession_CognitoAuthSession = function () {
  /**
   * Constructs a new CognitoUserSession object
   * @param {CognitoIdToken} IdToken The session's Id token.
   * @param {CognitoRefreshToken} RefreshToken The session's refresh token.
   * @param {CognitoAccessToken} AccessToken The session's access token.
   * @param {array}  TokenScopes  The session's token scopes.
    * @param {string} State The session's state. 
   */
  function CognitoAuthSession() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        IdToken = _ref.IdToken,
        RefreshToken = _ref.RefreshToken,
        AccessToken = _ref.AccessToken,
        TokenScopes = _ref.TokenScopes,
        State = _ref.State;

    CognitoAuthSession__classCallCheck(this, CognitoAuthSession);

    if (IdToken) {
      this.idToken = IdToken;
    } else {
      this.idToken = new es_CognitoIdToken();
    }
    if (RefreshToken) {
      this.refreshToken = RefreshToken;
    } else {
      this.refreshToken = new es_CognitoRefreshToken();
    }
    if (AccessToken) {
      this.accessToken = AccessToken;
    } else {
      this.accessToken = new es_CognitoAccessToken();
    }
    if (TokenScopes) {
      this.tokenScopes = TokenScopes;
    } else {
      this.tokenScopes = new es_CognitoTokenScopes();
    }
    if (State) {
      this.state = State;
    } else {
      this.state = null;
    }
  }

  /**
   * @returns {CognitoIdToken} the session's Id token
   */


  CognitoAuthSession.prototype.getIdToken = function getIdToken() {
    return this.idToken;
  };

  /**
   * Set a new Id token
   * @param {CognitoIdToken} IdToken The session's Id token.
   * @returns {void}
   */


  CognitoAuthSession.prototype.setIdToken = function setIdToken(IdToken) {
    this.idToken = IdToken;
  };

  /**
   * @returns {CognitoRefreshToken} the session's refresh token
   */


  CognitoAuthSession.prototype.getRefreshToken = function getRefreshToken() {
    return this.refreshToken;
  };

  /**
   * Set a new Refresh token
   * @param {CognitoRefreshToken} RefreshToken The session's refresh token.
   * @returns {void}
   */


  CognitoAuthSession.prototype.setRefreshToken = function setRefreshToken(RefreshToken) {
    this.refreshToken = RefreshToken;
  };

  /**
   * @returns {CognitoAccessToken} the session's access token
   */


  CognitoAuthSession.prototype.getAccessToken = function getAccessToken() {
    return this.accessToken;
  };

  /**
   * Set a new Access token
   * @param {CognitoAccessToken} AccessToken The session's access token.
   * @returns {void}
   */


  CognitoAuthSession.prototype.setAccessToken = function setAccessToken(AccessToken) {
    this.accessToken = AccessToken;
  };

  /**
   * @returns {CognitoTokenScopes} the session's token scopes
   */


  CognitoAuthSession.prototype.getTokenScopes = function getTokenScopes() {
    return this.tokenScopes;
  };

  /**
   * Set new token scopes
   * @param {array}  tokenScopes  The session's token scopes.
   * @returns {void}
   */


  CognitoAuthSession.prototype.setTokenScopes = function setTokenScopes(tokenScopes) {
    this.tokenScopes = tokenScopes;
  };

  /**
   * @returns {string} the session's state
   */


  CognitoAuthSession.prototype.getState = function getState() {
    return this.state;
  };

  /**
   * Set new state
   * @param {string}  state  The session's state.
   * @returns {void}
   */


  CognitoAuthSession.prototype.setState = function setState(State) {
    this.state = State;
  };

  /**
   * Checks to see if the session is still valid based on session expiry information found
   * in Access and Id Tokens and the current time
   * @returns {boolean} if the session is still valid
   */


  CognitoAuthSession.prototype.isValid = function isValid() {
    var now = Math.floor(new Date() / 1000);
    try {
      if (this.accessToken != null) {
        return now < this.accessToken.getExpiration();
      }
      if (this.idToken != null) {
        return now < this.idToken.getExpiration();
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  return CognitoAuthSession;
}();

/* harmony default export */ var es_CognitoAuthSession = (CognitoAuthSession_CognitoAuthSession);
// CONCATENATED MODULE: /Users/potterve/Source/aws-lex-web-ui/node_modules/amazon-cognito-auth-js/es/StorageHelper.js
function StorageHelper__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * Amazon Cognito Auth SDK for JavaScript
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *         http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file.
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
 * OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions
 * and limitations under the License.
 */
var dataMemory = {};

/** @class */

var MemoryStorage = function () {
  function MemoryStorage() {
    StorageHelper__classCallCheck(this, MemoryStorage);
  }

  /**
   * This is used to set a specific item in storage
   * @param {string} key - the key for the item
   * @param {object} value - the value
   * @returns {string} value that was set
   */
  MemoryStorage.setItem = function setItem(key, value) {
    dataMemory[key] = value;
    return dataMemory[key];
  };

  /**
   * This is used to get a specific key from storage
   * @param {string} key - the key for the item
   * This is used to clear the storage
   * @returns {string} the data item
   */


  MemoryStorage.getItem = function getItem(key) {
    return Object.prototype.hasOwnProperty.call(dataMemory, key) ? dataMemory[key] : undefined;
  };

  /**
   * This is used to remove an item from storage
   * @param {string} key - the key being set
   * @returns {string} value - value that was deleted
   */


  MemoryStorage.removeItem = function removeItem(key) {
    return delete dataMemory[key];
  };

  /**
   * This is used to clear the storage
   * @returns {string} nothing
   */


  MemoryStorage.clear = function clear() {
    dataMemory = {};
    return dataMemory;
  };

  return MemoryStorage;
}();

/** @class */


var StorageHelper = function () {

  /**
   * This is used to get a storage object
   * @returns {object} the storage
   */
  function StorageHelper() {
    StorageHelper__classCallCheck(this, StorageHelper);

    try {
      this.storageWindow = window.localStorage;
      this.storageWindow.setItem('aws.cognito.test-ls', 1);
      this.storageWindow.removeItem('aws.cognito.test-ls');
    } catch (exception) {
      this.storageWindow = MemoryStorage;
    }
  }

  /**
   * This is used to return the storage
   * @returns {object} the storage
   */


  StorageHelper.prototype.getStorage = function getStorage() {
    return this.storageWindow;
  };

  return StorageHelper;
}();

/* harmony default export */ var es_StorageHelper = (StorageHelper);
// CONCATENATED MODULE: /Users/potterve/Source/aws-lex-web-ui/node_modules/amazon-cognito-auth-js/es/CognitoAuth.js
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function CognitoAuth__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
  * Amazon Cognito Auth SDK for JavaScript
  * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License").
  * You may not use this file except in compliance with the License.
  * A copy of the License is located at
  *
  *         http://aws.amazon.com/apache2.0/
  *
  * or in the "license" file accompanying this file.
  * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
  * OR CONDITIONS OF ANY KIND, either express or implied. See the
  * License for the specific language governing permissions
  * and limitations under the License.
  */








/** @class */

var CognitoAuth_CognitoAuth = function () {
  /**
   * Constructs a new CognitoAuth object
   * @param {object} data Creation options
   * @param {string} data.ClientId Required: User pool application client id.
   * @param {string} data.AppWebDomain Required: The application/user-pools Cognito web hostname,
   *                     this is set at the Cognito console.
   * @param {array} data.TokenScopesArray Optional: The token scopes
   * @param {string} data.RedirectUriSignIn Required: The redirect Uri,
   * which will be launched after authentication as signed in.
   * @param {string} data.RedirectUriSignOut Required:
   * The redirect Uri, which will be launched when signed out.
   * @param {string} data.IdentityProvider Optional: Pre-selected identity provider (this allows to
   * automatically trigger social provider authentication flow).
   * @param {string} data.UserPoolId Optional: UserPoolId for the configured cognito userPool.
   * @param {boolean} data.AdvancedSecurityDataCollectionFlag Optional: boolean flag indicating if the
   *        data collection is enabled to support cognito advanced security features. By default, this
   *        flag is set to true.
   * @param {nodeCallback<CognitoAuthSession>} Optional: userhandler Called on success or error.
   */
  function CognitoAuth(data) {
    CognitoAuth__classCallCheck(this, CognitoAuth);

    var _ref = data || {},
        ClientId = _ref.ClientId,
        AppWebDomain = _ref.AppWebDomain,
        TokenScopesArray = _ref.TokenScopesArray,
        RedirectUriSignIn = _ref.RedirectUriSignIn,
        RedirectUriSignOut = _ref.RedirectUriSignOut,
        IdentityProvider = _ref.IdentityProvider,
        UserPoolId = _ref.UserPoolId,
        AdvancedSecurityDataCollectionFlag = _ref.AdvancedSecurityDataCollectionFlag,
        Storage = _ref.Storage;

    if (data == null || !ClientId || !AppWebDomain || !RedirectUriSignIn || !RedirectUriSignOut) {
      throw new Error(this.getCognitoConstants().PARAMETERERROR);
    }

    this.clientId = ClientId;
    this.appWebDomain = AppWebDomain;
    this.TokenScopesArray = TokenScopesArray || [];
    if (!Array.isArray(TokenScopesArray)) {
      throw new Error(this.getCognitoConstants().SCOPETYPEERROR);
    }
    var tokenScopes = new es_CognitoTokenScopes(this.TokenScopesArray);
    this.RedirectUriSignIn = RedirectUriSignIn;
    this.RedirectUriSignOut = RedirectUriSignOut;
    this.IdentityProvider = IdentityProvider;
    this.responseType = this.getCognitoConstants().TOKEN;
    this.storage = Storage || new es_StorageHelper().getStorage();
    this.username = this.getLastUser();
    this.userPoolId = UserPoolId;
    this.signInUserSession = this.getCachedSession();
    +this.signInUserSession.setTokenScopes(tokenScopes);

    /**
     * By default, AdvancedSecurityDataCollectionFlag is set to true, if no input value is provided.
     */
    this.advancedSecurityDataCollectionFlag = true;
    if (AdvancedSecurityDataCollectionFlag) {
      this.advancedSecurityDataCollectionFlag = AdvancedSecurityDataCollectionFlag;
    }
  }

  /**
   * @returns {JSON} the constants
   */


  CognitoAuth.prototype.getCognitoConstants = function getCognitoConstants() {
    var CognitoConstants = {
      DOMAIN_SCHEME: 'https',
      DOMAIN_PATH_SIGNIN: 'oauth2/authorize',
      DOMAIN_PATH_TOKEN: 'oauth2/token',
      DOMAIN_PATH_SIGNOUT: 'logout',
      DOMAIN_QUERY_PARAM_REDIRECT_URI: 'redirect_uri',
      DOMAIN_QUERY_PARAM_SIGNOUT_URI: 'logout_uri',
      DOMAIN_QUERY_PARAM_RESPONSE_TYPE: 'response_type',
      DOMAIN_QUERY_PARAM_IDENTITY_PROVIDER: 'identity_provider',
      DOMAIN_QUERY_PARAM_USERCONTEXTDATA: 'userContextData',
      CLIENT_ID: 'client_id',
      STATE: 'state',
      SCOPE: 'scope',
      TOKEN: 'token',
      CODE: 'code',
      POST: 'POST',
      PARAMETERERROR: 'The parameters: App client Id, App web domain' + ', the redirect URL when you are signed in and the ' + 'redirect URL when you are signed out are required.',
      SCOPETYPEERROR: 'Scopes have to be array type. ',
      QUESTIONMARK: '?',
      POUNDSIGN: '#',
      COLONDOUBLESLASH: '://',
      SLASH: '/',
      AMPERSAND: '&',
      EQUALSIGN: '=',
      SPACE: ' ',
      CONTENTTYPE: 'Content-Type',
      CONTENTTYPEVALUE: 'application/x-www-form-urlencoded',
      AUTHORIZATIONCODE: 'authorization_code',
      IDTOKEN: 'id_token',
      ACCESSTOKEN: 'access_token',
      REFRESHTOKEN: 'refresh_token',
      ERROR: 'error',
      ERROR_DESCRIPTION: 'error_description',
      STRINGTYPE: 'string',
      STATELENGTH: 32,
      STATEORIGINSTRING: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      WITHCREDENTIALS: 'withCredentials',
      UNDEFINED: 'undefined',
      SELF: '_self',
      HOSTNAMEREGEX: /:\/\/([0-9]?\.)?(.[^/:]+)/i,
      QUERYPARAMETERREGEX1: /#(.+)/,
      QUERYPARAMETERREGEX2: /=(.+)/,
      HEADER: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    return CognitoConstants;
  };

  /**
   * @returns {string} the client id
   */


  CognitoAuth.prototype.getClientId = function getClientId() {
    return this.clientId;
  };

  /**
   * @returns {string} the app web domain
   */


  CognitoAuth.prototype.getAppWebDomain = function getAppWebDomain() {
    return this.appWebDomain;
  };

  /**
   * method for getting the current user of the application from the local storage
   *
   * @returns {CognitoAuth} the user retrieved from storage
   */


  CognitoAuth.prototype.getCurrentUser = function getCurrentUser() {
    var lastUserKey = 'CognitoIdentityServiceProvider.' + this.clientId + '.LastAuthUser';

    var lastAuthUser = this.storage.getItem(lastUserKey);
    return lastAuthUser;
  };

  /**
   * @param {string} Username the user's name
   * method for setting the current user's name
   * @returns {void}
   */


  CognitoAuth.prototype.setUser = function setUser(Username) {
    this.username = Username;
  };

  /**
   * sets response type to 'code'
   * @returns {void}
   */


  CognitoAuth.prototype.useCodeGrantFlow = function useCodeGrantFlow() {
    this.responseType = this.getCognitoConstants().CODE;
  };

  /**
   * sets response type to 'token'
   * @returns {void}
   */


  CognitoAuth.prototype.useImplicitFlow = function useImplicitFlow() {
    this.responseType = this.getCognitoConstants().TOKEN;
  };

  /**
   * @returns {CognitoAuthSession} the current session for this user
   */


  CognitoAuth.prototype.getSignInUserSession = function getSignInUserSession() {
    return this.signInUserSession;
  };

  /**
   * @returns {string} the user's username
   */


  CognitoAuth.prototype.getUsername = function getUsername() {
    return this.username;
  };

  /**
   * @param {string} Username the user's username
   * @returns {void}
   */


  CognitoAuth.prototype.setUsername = function setUsername(Username) {
    this.username = Username;
  };

  /**
   * @returns {string} the user's state
   */


  CognitoAuth.prototype.getState = function getState() {
    return this.state;
  };

  /**
   * @param {string} State the user's state
   * @returns {void}
   */


  CognitoAuth.prototype.setState = function setState(State) {
    this.state = State;
  };

  /**
   * This is used to get a session, either from the session object
   * or from the local storage, or by using a refresh token
   * @param {string} RedirectUriSignIn Required: The redirect Uri,
   * which will be launched after authentication.
   * @param {array} TokenScopesArray Required: The token scopes, it is an
   * array of strings specifying all scopes for the tokens.
   * @returns {void}
   */


  CognitoAuth.prototype.getSession = function getSession() {
    var tokenScopesInputSet = new Set(this.TokenScopesArray);
    var cachedScopesSet = new Set(this.signInUserSession.tokenScopes.getScopes());
    var URL = this.getFQDNSignIn();
    if (this.signInUserSession != null && this.signInUserSession.isValid()) {
      return this.userhandler.onSuccess(this.signInUserSession);
    }
    this.signInUserSession = this.getCachedSession();
    // compare scopes
    if (!this.compareSets(tokenScopesInputSet, cachedScopesSet)) {
      var tokenScopes = new es_CognitoTokenScopes(this.TokenScopesArray);
      var idToken = new es_CognitoIdToken();
      var accessToken = new es_CognitoAccessToken();
      var refreshToken = new es_CognitoRefreshToken();
      this.signInUserSession.setTokenScopes(tokenScopes);
      this.signInUserSession.setIdToken(idToken);
      this.signInUserSession.setAccessToken(accessToken);
      this.signInUserSession.setRefreshToken(refreshToken);
      this.launchUri(URL);
    } else if (this.signInUserSession.isValid()) {
      return this.userhandler.onSuccess(this.signInUserSession);
    } else if (!this.signInUserSession.getRefreshToken() || !this.signInUserSession.getRefreshToken().getToken()) {
      this.launchUri(URL);
    } else {
      this.refreshSession(this.signInUserSession.getRefreshToken().getToken());
    }
    return undefined;
  };

  /**
   * @param {string} httpRequestResponse the http request response
   * @returns {void}
   * Parse the http request response and proceed according to different response types.
   */


  CognitoAuth.prototype.parseCognitoWebResponse = function parseCognitoWebResponse(httpRequestResponse) {
    var map = void 0;
    if (httpRequestResponse.indexOf(this.getCognitoConstants().QUESTIONMARK) > -1) {
      // for code type
      // this is to avoid a bug exists when sign in with Google or facebook
      // Sometimes the code will contain a poundsign in the end which breaks the parsing
      var response = httpRequestResponse.split(this.getCognitoConstants().POUNDSIGN)[0];
      map = this.getQueryParameters(response, this.getCognitoConstants().QUESTIONMARK);
      this.getCodeQueryParameter(map);
    } else if (httpRequestResponse.indexOf(this.getCognitoConstants().POUNDSIGN) > -1) {
      // for token type
      map = this.getQueryParameters(httpRequestResponse, this.getCognitoConstants().QUERYPARAMETERREGEX1);
      if (map.has(this.getCognitoConstants().ERROR)) {
        return this.userhandler.onFailure(map.get(this.getCognitoConstants().ERROR_DESCRIPTION));
      }
      // To use the map to get tokens
      this.getTokenQueryParameter(map);
    }
  };

  /**
   * @param {map} Query parameter map 
   * @returns {void}
   * Get the query parameter map and proceed according to code response type.
   */


  CognitoAuth.prototype.getCodeQueryParameter = function getCodeQueryParameter(map) {
    var state = null;
    if (map.has(this.getCognitoConstants().STATE)) {
      this.signInUserSession.setState(map.get(this.getCognitoConstants().STATE));
    } else {
      this.signInUserSession.setState(state);
    }

    if (map.has(this.getCognitoConstants().CODE)) {
      // if the response contains code
      // To parse the response and get the code value.
      var codeParameter = map.get(this.getCognitoConstants().CODE);
      var url = this.getCognitoConstants().DOMAIN_SCHEME.concat(this.getCognitoConstants().COLONDOUBLESLASH, this.getAppWebDomain(), this.getCognitoConstants().SLASH, this.getCognitoConstants().DOMAIN_PATH_TOKEN);
      var header = this.getCognitoConstants().HEADER;
      var body = { grant_type: this.getCognitoConstants().AUTHORIZATIONCODE,
        client_id: this.getClientId(),
        redirect_uri: this.RedirectUriSignIn,
        code: codeParameter };
      var boundOnSuccess = this.onSuccessExchangeForToken.bind(this);
      var boundOnFailure = this.onFailure.bind(this);
      this.makePOSTRequest(header, body, url, boundOnSuccess, boundOnFailure);
    }
  };

  /**
   * Get the query parameter map and proceed according to token response type.
   * @param {map} Query parameter map 
   * @returns {void}
   */


  CognitoAuth.prototype.getTokenQueryParameter = function getTokenQueryParameter(map) {
    var idToken = new es_CognitoIdToken();
    var accessToken = new es_CognitoAccessToken();
    var refreshToken = new es_CognitoRefreshToken();
    var state = null;
    if (map.has(this.getCognitoConstants().IDTOKEN)) {
      idToken.setJwtToken(map.get(this.getCognitoConstants().IDTOKEN));
      this.signInUserSession.setIdToken(idToken);
    } else {
      this.signInUserSession.setIdToken(idToken);
    }
    if (map.has(this.getCognitoConstants().ACCESSTOKEN)) {
      accessToken.setJwtToken(map.get(this.getCognitoConstants().ACCESSTOKEN));
      this.signInUserSession.setAccessToken(accessToken);
    } else {
      this.signInUserSession.setAccessToken(accessToken);
    }
    if (map.has(this.getCognitoConstants().STATE)) {
      this.signInUserSession.setState(map.get(this.getCognitoConstants().STATE));
    } else {
      this.signInUserSession.setState(state);
    }
    this.cacheTokensScopes();
    this.userhandler.onSuccess(this.signInUserSession);
  };

  /**
   * Get cached tokens and scopes and return a new session using all the cached data.
   * @returns {CognitoAuthSession} the auth session
   */


  CognitoAuth.prototype.getCachedSession = function getCachedSession() {
    if (!this.username) {
      return new es_CognitoAuthSession();
    }
    var keyPrefix = 'CognitoIdentityServiceProvider.' + this.getClientId() + '.' + this.username;
    var idTokenKey = keyPrefix + '.idToken';
    var accessTokenKey = keyPrefix + '.accessToken';
    var refreshTokenKey = keyPrefix + '.refreshToken';
    var scopeKey = keyPrefix + '.tokenScopesString';

    var scopesString = this.storage.getItem(scopeKey);
    var scopesArray = [];
    if (scopesString) {
      scopesArray = scopesString.split(' ');
    }
    var tokenScopes = new es_CognitoTokenScopes(scopesArray);
    var idToken = new es_CognitoIdToken(this.storage.getItem(idTokenKey));
    var accessToken = new es_CognitoAccessToken(this.storage.getItem(accessTokenKey));
    var refreshToken = new es_CognitoRefreshToken(this.storage.getItem(refreshTokenKey));

    var sessionData = {
      IdToken: idToken,
      AccessToken: accessToken,
      RefreshToken: refreshToken,
      TokenScopes: tokenScopes
    };
    var cachedSession = new es_CognitoAuthSession(sessionData);
    return cachedSession;
  };

  /**
   * This is used to get last signed in user from local storage
   * @returns {string} the last user name
   */


  CognitoAuth.prototype.getLastUser = function getLastUser() {
    var keyPrefix = 'CognitoIdentityServiceProvider.' + this.getClientId();
    var lastUserKey = keyPrefix + '.LastAuthUser';
    var lastUserName = this.storage.getItem(lastUserKey);
    if (lastUserName) {
      return lastUserName;
    }
    return undefined;
  };

  /**
   * This is used to save the session tokens and scopes to local storage
   * Input parameter is a set of strings.
   * @returns {void}
   */


  CognitoAuth.prototype.cacheTokensScopes = function cacheTokensScopes() {
    var keyPrefix = 'CognitoIdentityServiceProvider.' + this.getClientId();
    var tokenUserName = this.signInUserSession.getAccessToken().getUsername();
    this.username = tokenUserName;
    var idTokenKey = keyPrefix + '.' + tokenUserName + '.idToken';
    var accessTokenKey = keyPrefix + '.' + tokenUserName + '.accessToken';
    var refreshTokenKey = keyPrefix + '.' + tokenUserName + '.refreshToken';
    var lastUserKey = keyPrefix + '.LastAuthUser';
    var scopeKey = keyPrefix + '.' + tokenUserName + '.tokenScopesString';
    var scopesArray = this.signInUserSession.getTokenScopes().getScopes();
    var scopesString = scopesArray.join(' ');
    this.storage.setItem(idTokenKey, this.signInUserSession.getIdToken().getJwtToken());
    this.storage.setItem(accessTokenKey, this.signInUserSession.getAccessToken().getJwtToken());
    this.storage.setItem(refreshTokenKey, this.signInUserSession.getRefreshToken().getToken());
    this.storage.setItem(lastUserKey, tokenUserName);
    this.storage.setItem(scopeKey, scopesString);
  };

  /**
   * Compare two sets if they are identical.
   * @param {set} set1 one set
   * @param {set} set2 the other set
   * @returns {boolean} boolean value is true if two sets are identical
   */


  CognitoAuth.prototype.compareSets = function compareSets(set1, set2) {
    if (set1.size !== set2.size) {
      return false;
    }
    for (var _iterator = set1, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref2 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref2 = _i.value;
      }

      var item = _ref2;

      if (!set2.has(item)) {
        return false;
      }
    }
    return true;
  };

  /**
   * @param {string} url the url string
   * Get the hostname from url.
   * @returns {string} hostname string
   */


  CognitoAuth.prototype.getHostName = function getHostName(url) {
    var match = url.match(this.getCognitoConstants().HOSTNAMEREGEX);
    if (match != null && match.length > 2 && _typeof(match[2]) === this.getCognitoConstants().STRINGTYPE && match[2].length > 0) {
      return match[2];
    }
    return undefined;
  };

  /**
   * Get http query parameters and return them as a map.
   * @param {string} url the url string
   * @param {string} splitMark query parameters split mark (prefix)
   * @returns {map} map
   */


  CognitoAuth.prototype.getQueryParameters = function getQueryParameters(url, splitMark) {
    var str = String(url).split(splitMark);
    var url2 = str[1];
    var str1 = String(url2).split(this.getCognitoConstants().AMPERSAND);
    var num = str1.length;
    var map = new Map();
    var i = void 0;
    for (i = 0; i < num; i++) {
      str1[i] = String(str1[i]).split(this.getCognitoConstants().QUERYPARAMETERREGEX2);
      map.set(str1[i][0], str1[i][1]);
    }
    return map;
  };

  /**
   * helper function to generate a random string
   * @param {int} length the length of string
   * @param {string} chars a original string
   * @returns {string} a random value.
   */


  CognitoAuth.prototype.generateRandomString = function generateRandomString(length, chars) {
    var result = '';
    var i = length;
    for (; i > 0; --i) {
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    }return result;
  };

  /**
   * This is used to clear the session tokens and scopes from local storage
   * @returns {void}
   */


  CognitoAuth.prototype.clearCachedTokensScopes = function clearCachedTokensScopes() {
    var keyPrefix = 'CognitoIdentityServiceProvider.' + this.getClientId();
    var idTokenKey = keyPrefix + '.' + this.username + '.idToken';
    var accessTokenKey = keyPrefix + '.' + this.username + '.accessToken';
    var refreshTokenKey = keyPrefix + '.' + this.username + '.refreshToken';
    var lastUserKey = keyPrefix + '.LastAuthUser';
    var scopeKey = keyPrefix + '.' + this.username + '.tokenScopesString';

    this.storage.removeItem(idTokenKey);
    this.storage.removeItem(accessTokenKey);
    this.storage.removeItem(refreshTokenKey);
    this.storage.removeItem(lastUserKey);
    this.storage.removeItem(scopeKey);
  };

  /**
   * This is used to build a user session from tokens retrieved in the authentication result
   * @param {object} refreshToken authResult Successful auth response from server.
   * @returns {void}
   */


  CognitoAuth.prototype.refreshSession = function refreshSession(refreshToken) {
    // https POST call for refreshing token
    var url = this.getCognitoConstants().DOMAIN_SCHEME.concat(this.getCognitoConstants().COLONDOUBLESLASH, this.getAppWebDomain(), this.getCognitoConstants().SLASH, this.getCognitoConstants().DOMAIN_PATH_TOKEN);
    var header = this.getCognitoConstants().HEADER;
    var body = { grant_type: this.getCognitoConstants().REFRESHTOKEN,
      client_id: this.getClientId(),
      redirect_uri: this.RedirectUriSignIn,
      refresh_token: refreshToken };
    var boundOnSuccess = this.onSuccessRefreshToken.bind(this);
    var boundOnFailure = this.onFailure.bind(this);
    this.makePOSTRequest(header, body, url, boundOnSuccess, boundOnFailure);
  };

  /**
   * Make the http POST request.
   * @param {JSON} header header JSON object
   * @param {JSON} body body JSON object
   * @param {string} url string
   * @param {function} onSuccess callback
   * @param {function} onFailure callback
   * @returns {void}
   */


  CognitoAuth.prototype.makePOSTRequest = function makePOSTRequest(header, body, url, onSuccess, onFailure) {
    // This is a sample server that supports CORS.
    var xhr = this.createCORSRequest(this.getCognitoConstants().POST, url);
    var bodyString = '';
    if (!xhr) {
      return;
    }
    // set header
    for (var key in header) {
      xhr.setRequestHeader(key, header[key]);
    }
    for (var _key in body) {
      bodyString = bodyString.concat(_key, this.getCognitoConstants().EQUALSIGN, body[_key], this.getCognitoConstants().AMPERSAND);
    }
    bodyString = bodyString.substring(0, bodyString.length - 1);
    xhr.send(bodyString);
    xhr.onreadystatechange = function addressState() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          onSuccess(xhr.responseText);
        } else {
          onFailure(xhr.responseText);
        }
      }
    };
  };

  /**
   * Create the XHR object
   * @param {string} method which method to call
   * @param {string} url the url string
   * @returns {object} xhr
   */


  CognitoAuth.prototype.createCORSRequest = function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    if (this.getCognitoConstants().WITHCREDENTIALS in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open(method, url, true);
    } else if ((typeof XDomainRequest === 'undefined' ? 'undefined' : _typeof(XDomainRequest)) !== this.getCognitoConstants().UNDEFINED) {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      // CORS not supported.
      xhr = null;
    }
    return xhr;
  };

  /**
   * The http POST request onFailure callback.
   * @param {object} err the error object
   * @returns {function} onFailure
   */


  CognitoAuth.prototype.onFailure = function onFailure(err) {
    this.userhandler.onFailure(err);
  };

  /**
   * The http POST request onSuccess callback when refreshing tokens.
   * @param {JSON} jsonData tokens
   */


  CognitoAuth.prototype.onSuccessRefreshToken = function onSuccessRefreshToken(jsonData) {
    var jsonDataObject = JSON.parse(jsonData);
    if (Object.prototype.hasOwnProperty.call(jsonDataObject, this.getCognitoConstants().ERROR)) {
      var URL = this.getFQDNSignIn();
      this.launchUri(URL);
    } else {
      if (Object.prototype.hasOwnProperty.call(jsonDataObject, this.getCognitoConstants().IDTOKEN)) {
        this.signInUserSession.setIdToken(new es_CognitoIdToken(jsonDataObject.id_token));
      }
      if (Object.prototype.hasOwnProperty.call(jsonDataObject, this.getCognitoConstants().ACCESSTOKEN)) {
        this.signInUserSession.setAccessToken(new es_CognitoAccessToken(jsonDataObject.access_token));
      }
      this.cacheTokensScopes();
      this.userhandler.onSuccess(this.signInUserSession);
    }
  };

  /**
   * The http POST request onSuccess callback when exchanging code for tokens.
   * @param {JSON} jsonData tokens
   */


  CognitoAuth.prototype.onSuccessExchangeForToken = function onSuccessExchangeForToken(jsonData) {
    var jsonDataObject = JSON.parse(jsonData);
    var refreshToken = new es_CognitoRefreshToken();
    var accessToken = new es_CognitoAccessToken();
    var idToken = new es_CognitoIdToken();
    var state = null;
    if (Object.prototype.hasOwnProperty.call(jsonDataObject, this.getCognitoConstants().ERROR)) {
      return this.userhandler.onFailure(jsonData);
    }
    if (Object.prototype.hasOwnProperty.call(jsonDataObject, this.getCognitoConstants().IDTOKEN)) {
      this.signInUserSession.setIdToken(new es_CognitoIdToken(jsonDataObject.id_token));
    } else {
      this.signInUserSession.setIdToken(idToken);
    }
    if (Object.prototype.hasOwnProperty.call(jsonDataObject, this.getCognitoConstants().ACCESSTOKEN)) {
      this.signInUserSession.setAccessToken(new es_CognitoAccessToken(jsonDataObject.access_token));
    } else {
      this.signInUserSession.setAccessToken(accessToken);
    }
    if (Object.prototype.hasOwnProperty.call(jsonDataObject, this.getCognitoConstants().REFRESHTOKEN)) {
      this.signInUserSession.setRefreshToken(new es_CognitoRefreshToken(jsonDataObject.refresh_token));
    } else {
      this.signInUserSession.setRefreshToken(refreshToken);
    }
    this.cacheTokensScopes();
    this.userhandler.onSuccess(this.signInUserSession);
  };

  /**
   * Launch Cognito Auth UI page.
   * @param {string} URL the url to launch
   * @returns {void}
   */


  CognitoAuth.prototype.launchUri = function launchUri(URL) {
    window.open(URL, this.getCognitoConstants().SELF);
  };

  /**
   * @returns {string} scopes string
   */


  CognitoAuth.prototype.getSpaceSeperatedScopeString = function getSpaceSeperatedScopeString() {
    var tokenScopesString = this.signInUserSession.getTokenScopes().getScopes();
    tokenScopesString = tokenScopesString.join(this.getCognitoConstants().SPACE);
    return encodeURIComponent(tokenScopesString);
  };

  /**
   * Create the FQDN(fully qualified domain name) for authorization endpoint.
   * @returns {string} url
   */


  CognitoAuth.prototype.getFQDNSignIn = function getFQDNSignIn() {
    if (this.state == null) {
      this.state = this.generateRandomString(this.getCognitoConstants().STATELENGTH, this.getCognitoConstants().STATEORIGINSTRING);
    }

    var identityProviderParam = this.IdentityProvider ? this.getCognitoConstants().AMPERSAND.concat(this.getCognitoConstants().DOMAIN_QUERY_PARAM_IDENTITY_PROVIDER, this.getCognitoConstants().EQUALSIGN, this.IdentityProvider) : '';
    var tokenScopesString = this.getSpaceSeperatedScopeString();

    var userContextDataParam = '';
    var userContextData = this.getUserContextData();
    if (userContextData) {
      userContextDataParam = this.getCognitoConstants().AMPERSAND + this.getCognitoConstants().DOMAIN_QUERY_PARAM_USERCONTEXTDATA + this.getCognitoConstants().EQUALSIGN + this.getUserContextData();
    }

    // Build the complete web domain to launch the login screen
    var uri = this.getCognitoConstants().DOMAIN_SCHEME.concat(this.getCognitoConstants().COLONDOUBLESLASH, this.getAppWebDomain(), this.getCognitoConstants().SLASH, this.getCognitoConstants().DOMAIN_PATH_SIGNIN, this.getCognitoConstants().QUESTIONMARK, this.getCognitoConstants().DOMAIN_QUERY_PARAM_REDIRECT_URI, this.getCognitoConstants().EQUALSIGN, encodeURIComponent(this.RedirectUriSignIn), this.getCognitoConstants().AMPERSAND, this.getCognitoConstants().DOMAIN_QUERY_PARAM_RESPONSE_TYPE, this.getCognitoConstants().EQUALSIGN, this.responseType, this.getCognitoConstants().AMPERSAND, this.getCognitoConstants().CLIENT_ID, this.getCognitoConstants().EQUALSIGN, this.getClientId(), this.getCognitoConstants().AMPERSAND, this.getCognitoConstants().STATE, this.getCognitoConstants().EQUALSIGN, this.state, this.getCognitoConstants().AMPERSAND, this.getCognitoConstants().SCOPE, this.getCognitoConstants().EQUALSIGN, tokenScopesString, identityProviderParam, userContextDataParam);

    return uri;
  };

  /**
   * Sign out the user.
   * @returns {void}
   */


  CognitoAuth.prototype.signOut = function signOut() {
    var URL = this.getFQDNSignOut();
    this.signInUserSession = null;
    this.clearCachedTokensScopes();
    this.launchUri(URL);
  };

  /**
   * Create the FQDN(fully qualified domain name) for signout endpoint.
   * @returns {string} url
   */


  CognitoAuth.prototype.getFQDNSignOut = function getFQDNSignOut() {
    var uri = this.getCognitoConstants().DOMAIN_SCHEME.concat(this.getCognitoConstants().COLONDOUBLESLASH, this.getAppWebDomain(), this.getCognitoConstants().SLASH, this.getCognitoConstants().DOMAIN_PATH_SIGNOUT, this.getCognitoConstants().QUESTIONMARK, this.getCognitoConstants().DOMAIN_QUERY_PARAM_SIGNOUT_URI, this.getCognitoConstants().EQUALSIGN, encodeURIComponent(this.RedirectUriSignOut), this.getCognitoConstants().AMPERSAND, this.getCognitoConstants().CLIENT_ID, this.getCognitoConstants().EQUALSIGN, this.getClientId());
    return uri;
  };

  /**
   * This method returns the encoded data string used for cognito advanced security feature.
   * This would be generated only when developer has included the JS used for collecting the
   * data on their client. Please refer to documentation to know more about using AdvancedSecurity
   * features
   **/


  CognitoAuth.prototype.getUserContextData = function getUserContextData() {
    if (typeof AmazonCognitoAdvancedSecurityData === "undefined") {
      return;
    }

    var _username = "";
    if (this.username) {
      _username = this.username;
    }

    var _userpoolId = "";
    if (this.userpoolId) {
      _userpoolId = this.userpoolId;
    }

    if (this.advancedSecurityDataCollectionFlag) {
      return AmazonCognitoAdvancedSecurityData.getData(_username, _userpoolId, this.clientId);
    }
  };

  /**
   * Helper method to let the user know if he has either a valid cached session 
   * or a valid authenticated session from the app integration callback.
   * @returns {boolean} userSignedIn 
   */


  CognitoAuth.prototype.isUserSignedIn = function isUserSignedIn() {
    return this.signInUserSession != null && this.signInUserSession.isValid() || this.getCachedSession() != null && this.getCachedSession().isValid();
  };

  return CognitoAuth;
}();

/* harmony default export */ var es_CognitoAuth = (CognitoAuth_CognitoAuth);
// CONCATENATED MODULE: /Users/potterve/Source/aws-lex-web-ui/node_modules/amazon-cognito-auth-js/es/DateHelper.js
function DateHelper__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * Amazon Cognito Auth SDK for JavaScript
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *         http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file.
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
 * OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions
 * and limitations under the License.
 */
var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var weekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** @class */

var DateHelper = function () {
  function DateHelper() {
    DateHelper__classCallCheck(this, DateHelper);
  }

  /**
   * @returns {string} The current time in "ddd MMM D HH:mm:ss UTC YYYY" format.
   */
  DateHelper.prototype.getNowString = function getNowString() {
    var now = new Date();

    var weekDay = weekNames[now.getUTCDay()];
    var month = monthNames[now.getUTCMonth()];
    var day = now.getUTCDate();

    var hours = now.getUTCHours();
    if (hours < 10) {
      hours = '0' + hours;
    }

    var minutes = now.getUTCMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    var seconds = now.getUTCSeconds();
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    var year = now.getUTCFullYear();

    // ddd MMM D HH:mm:ss UTC YYYY
    var dateNow = weekDay + ' ' + month + ' ' + day + ' ' + hours + ':' + minutes + ':' + seconds + ' UTC ' + year;

    return dateNow;
  };

  return DateHelper;
}();

/* harmony default export */ var es_DateHelper = (DateHelper);
// CONCATENATED MODULE: /Users/potterve/Source/aws-lex-web-ui/node_modules/amazon-cognito-auth-js/es/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CognitoAccessToken", function() { return es_CognitoAccessToken; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CognitoIdToken", function() { return es_CognitoIdToken; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CognitoRefreshToken", function() { return es_CognitoRefreshToken; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CognitoTokenScopes", function() { return es_CognitoTokenScopes; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CognitoAuth", function() { return es_CognitoAuth; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CognitoAuthSession", function() { return es_CognitoAuthSession; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DateHelper", function() { return es_DateHelper; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "StorageHelper", function() { return es_StorageHelper; });
/*!
 * Amazon Cognito Auth SDK for JavaScript
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *         http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file.
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
 * OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions
 * and limitations under the License.
 */










/***/ }),

/***/ "../../../node_modules/babel-runtime/core-js/json/stringify.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("../../../node_modules/core-js/library/fn/json/stringify.js"), __esModule: true };

/***/ }),

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

/***/ "../../../node_modules/core-js/library/fn/json/stringify.js":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("../../../node_modules/core-js/library/modules/_core.js");
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
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

/***/ "../../../node_modules/core-js/modules/_a-function.js":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_add-to-unscopables.js":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("../../../node_modules/core-js/modules/_wks.js")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("../../../node_modules/core-js/modules/_hide.js")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_an-instance.js":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_an-object.js":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_array-copy-within.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__("../../../node_modules/core-js/modules/_to-object.js");
var toAbsoluteIndex = __webpack_require__("../../../node_modules/core-js/modules/_to-absolute-index.js");
var toLength = __webpack_require__("../../../node_modules/core-js/modules/_to-length.js");

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_array-fill.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__("../../../node_modules/core-js/modules/_to-object.js");
var toAbsoluteIndex = __webpack_require__("../../../node_modules/core-js/modules/_to-absolute-index.js");
var toLength = __webpack_require__("../../../node_modules/core-js/modules/_to-length.js");
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_array-includes.js":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("../../../node_modules/core-js/modules/_to-iobject.js");
var toLength = __webpack_require__("../../../node_modules/core-js/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__("../../../node_modules/core-js/modules/_to-absolute-index.js");
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

/***/ "../../../node_modules/core-js/modules/_array-methods.js":
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__("../../../node_modules/core-js/modules/_ctx.js");
var IObject = __webpack_require__("../../../node_modules/core-js/modules/_iobject.js");
var toObject = __webpack_require__("../../../node_modules/core-js/modules/_to-object.js");
var toLength = __webpack_require__("../../../node_modules/core-js/modules/_to-length.js");
var asc = __webpack_require__("../../../node_modules/core-js/modules/_array-species-create.js");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_array-species-constructor.js":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
var isArray = __webpack_require__("../../../node_modules/core-js/modules/_is-array.js");
var SPECIES = __webpack_require__("../../../node_modules/core-js/modules/_wks.js")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_array-species-create.js":
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__("../../../node_modules/core-js/modules/_array-species-constructor.js");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_bind.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__("../../../node_modules/core-js/modules/_a-function.js");
var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
var invoke = __webpack_require__("../../../node_modules/core-js/modules/_invoke.js");
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_classof.js":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("../../../node_modules/core-js/modules/_cof.js");
var TAG = __webpack_require__("../../../node_modules/core-js/modules/_wks.js")('toStringTag');
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

/***/ "../../../node_modules/core-js/modules/_cof.js":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_collection-strong.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__("../../../node_modules/core-js/modules/_object-dp.js").f;
var create = __webpack_require__("../../../node_modules/core-js/modules/_object-create.js");
var redefineAll = __webpack_require__("../../../node_modules/core-js/modules/_redefine-all.js");
var ctx = __webpack_require__("../../../node_modules/core-js/modules/_ctx.js");
var anInstance = __webpack_require__("../../../node_modules/core-js/modules/_an-instance.js");
var forOf = __webpack_require__("../../../node_modules/core-js/modules/_for-of.js");
var $iterDefine = __webpack_require__("../../../node_modules/core-js/modules/_iter-define.js");
var step = __webpack_require__("../../../node_modules/core-js/modules/_iter-step.js");
var setSpecies = __webpack_require__("../../../node_modules/core-js/modules/_set-species.js");
var DESCRIPTORS = __webpack_require__("../../../node_modules/core-js/modules/_descriptors.js");
var fastKey = __webpack_require__("../../../node_modules/core-js/modules/_meta.js").fastKey;
var validate = __webpack_require__("../../../node_modules/core-js/modules/_validate-collection.js");
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_collection-weak.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__("../../../node_modules/core-js/modules/_redefine-all.js");
var getWeak = __webpack_require__("../../../node_modules/core-js/modules/_meta.js").getWeak;
var anObject = __webpack_require__("../../../node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
var anInstance = __webpack_require__("../../../node_modules/core-js/modules/_an-instance.js");
var forOf = __webpack_require__("../../../node_modules/core-js/modules/_for-of.js");
var createArrayMethod = __webpack_require__("../../../node_modules/core-js/modules/_array-methods.js");
var $has = __webpack_require__("../../../node_modules/core-js/modules/_has.js");
var validate = __webpack_require__("../../../node_modules/core-js/modules/_validate-collection.js");
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_collection.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("../../../node_modules/core-js/modules/_global.js");
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__("../../../node_modules/core-js/modules/_redefine.js");
var redefineAll = __webpack_require__("../../../node_modules/core-js/modules/_redefine-all.js");
var meta = __webpack_require__("../../../node_modules/core-js/modules/_meta.js");
var forOf = __webpack_require__("../../../node_modules/core-js/modules/_for-of.js");
var anInstance = __webpack_require__("../../../node_modules/core-js/modules/_an-instance.js");
var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
var fails = __webpack_require__("../../../node_modules/core-js/modules/_fails.js");
var $iterDetect = __webpack_require__("../../../node_modules/core-js/modules/_iter-detect.js");
var setToStringTag = __webpack_require__("../../../node_modules/core-js/modules/_set-to-string-tag.js");
var inheritIfRequired = __webpack_require__("../../../node_modules/core-js/modules/_inherit-if-required.js");

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_core.js":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "../../../node_modules/core-js/modules/_create-property.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("../../../node_modules/core-js/modules/_object-dp.js");
var createDesc = __webpack_require__("../../../node_modules/core-js/modules/_property-desc.js");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_ctx.js":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("../../../node_modules/core-js/modules/_a-function.js");
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

/***/ "../../../node_modules/core-js/modules/_defined.js":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_descriptors.js":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("../../../node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/_dom-create.js":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
var document = __webpack_require__("../../../node_modules/core-js/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_enum-bug-keys.js":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "../../../node_modules/core-js/modules/_enum-keys.js":
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__("../../../node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__("../../../node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__("../../../node_modules/core-js/modules/_object-pie.js");
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

/***/ "../../../node_modules/core-js/modules/_export.js":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("../../../node_modules/core-js/modules/_global.js");
var core = __webpack_require__("../../../node_modules/core-js/modules/_core.js");
var hide = __webpack_require__("../../../node_modules/core-js/modules/_hide.js");
var redefine = __webpack_require__("../../../node_modules/core-js/modules/_redefine.js");
var ctx = __webpack_require__("../../../node_modules/core-js/modules/_ctx.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
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

/***/ "../../../node_modules/core-js/modules/_fails-is-regexp.js":
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__("../../../node_modules/core-js/modules/_wks.js")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_fails.js":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_fix-re-wks.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__("../../../node_modules/core-js/modules/_hide.js");
var redefine = __webpack_require__("../../../node_modules/core-js/modules/_redefine.js");
var fails = __webpack_require__("../../../node_modules/core-js/modules/_fails.js");
var defined = __webpack_require__("../../../node_modules/core-js/modules/_defined.js");
var wks = __webpack_require__("../../../node_modules/core-js/modules/_wks.js");

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_flags.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("../../../node_modules/core-js/modules/_an-object.js");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_for-of.js":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("../../../node_modules/core-js/modules/_ctx.js");
var call = __webpack_require__("../../../node_modules/core-js/modules/_iter-call.js");
var isArrayIter = __webpack_require__("../../../node_modules/core-js/modules/_is-array-iter.js");
var anObject = __webpack_require__("../../../node_modules/core-js/modules/_an-object.js");
var toLength = __webpack_require__("../../../node_modules/core-js/modules/_to-length.js");
var getIterFn = __webpack_require__("../../../node_modules/core-js/modules/core.get-iterator-method.js");
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

/***/ "../../../node_modules/core-js/modules/_global.js":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "../../../node_modules/core-js/modules/_has.js":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_hide.js":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("../../../node_modules/core-js/modules/_object-dp.js");
var createDesc = __webpack_require__("../../../node_modules/core-js/modules/_property-desc.js");
module.exports = __webpack_require__("../../../node_modules/core-js/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_html.js":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("../../../node_modules/core-js/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "../../../node_modules/core-js/modules/_ie8-dom-define.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("../../../node_modules/core-js/modules/_descriptors.js") && !__webpack_require__("../../../node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__("../../../node_modules/core-js/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/_inherit-if-required.js":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
var setPrototypeOf = __webpack_require__("../../../node_modules/core-js/modules/_set-proto.js").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_invoke.js":
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

/***/ "../../../node_modules/core-js/modules/_iobject.js":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("../../../node_modules/core-js/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_is-array-iter.js":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("../../../node_modules/core-js/modules/_iterators.js");
var ITERATOR = __webpack_require__("../../../node_modules/core-js/modules/_wks.js")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_is-array.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("../../../node_modules/core-js/modules/_cof.js");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_is-integer.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_is-object.js":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_is-regexp.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
var cof = __webpack_require__("../../../node_modules/core-js/modules/_cof.js");
var MATCH = __webpack_require__("../../../node_modules/core-js/modules/_wks.js")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_iter-call.js":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("../../../node_modules/core-js/modules/_an-object.js");
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

/***/ "../../../node_modules/core-js/modules/_iter-create.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("../../../node_modules/core-js/modules/_object-create.js");
var descriptor = __webpack_require__("../../../node_modules/core-js/modules/_property-desc.js");
var setToStringTag = __webpack_require__("../../../node_modules/core-js/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("../../../node_modules/core-js/modules/_hide.js")(IteratorPrototype, __webpack_require__("../../../node_modules/core-js/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_iter-define.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("../../../node_modules/core-js/modules/_library.js");
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__("../../../node_modules/core-js/modules/_redefine.js");
var hide = __webpack_require__("../../../node_modules/core-js/modules/_hide.js");
var has = __webpack_require__("../../../node_modules/core-js/modules/_has.js");
var Iterators = __webpack_require__("../../../node_modules/core-js/modules/_iterators.js");
var $iterCreate = __webpack_require__("../../../node_modules/core-js/modules/_iter-create.js");
var setToStringTag = __webpack_require__("../../../node_modules/core-js/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__("../../../node_modules/core-js/modules/_object-gpo.js");
var ITERATOR = __webpack_require__("../../../node_modules/core-js/modules/_wks.js")('iterator');
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

/***/ "../../../node_modules/core-js/modules/_iter-detect.js":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("../../../node_modules/core-js/modules/_wks.js")('iterator');
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

/***/ "../../../node_modules/core-js/modules/_iter-step.js":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_iterators.js":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_library.js":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "../../../node_modules/core-js/modules/_math-expm1.js":
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),

/***/ "../../../node_modules/core-js/modules/_math-fround.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__("../../../node_modules/core-js/modules/_math-sign.js");
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_math-log1p.js":
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_math-sign.js":
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_meta.js":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("../../../node_modules/core-js/modules/_uid.js")('meta');
var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
var has = __webpack_require__("../../../node_modules/core-js/modules/_has.js");
var setDesc = __webpack_require__("../../../node_modules/core-js/modules/_object-dp.js").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("../../../node_modules/core-js/modules/_fails.js")(function () {
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

/***/ "../../../node_modules/core-js/modules/_microtask.js":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("../../../node_modules/core-js/modules/_global.js");
var macrotask = __webpack_require__("../../../node_modules/core-js/modules/_task.js").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__("../../../node_modules/core-js/modules/_cof.js")(process) == 'process';

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

/***/ "../../../node_modules/core-js/modules/_new-promise-capability.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__("../../../node_modules/core-js/modules/_a-function.js");

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

/***/ "../../../node_modules/core-js/modules/_object-assign.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__("../../../node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__("../../../node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__("../../../node_modules/core-js/modules/_object-pie.js");
var toObject = __webpack_require__("../../../node_modules/core-js/modules/_to-object.js");
var IObject = __webpack_require__("../../../node_modules/core-js/modules/_iobject.js");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("../../../node_modules/core-js/modules/_fails.js")(function () {
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

/***/ "../../../node_modules/core-js/modules/_object-create.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("../../../node_modules/core-js/modules/_an-object.js");
var dPs = __webpack_require__("../../../node_modules/core-js/modules/_object-dps.js");
var enumBugKeys = __webpack_require__("../../../node_modules/core-js/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__("../../../node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("../../../node_modules/core-js/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("../../../node_modules/core-js/modules/_html.js").appendChild(iframe);
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

/***/ "../../../node_modules/core-js/modules/_object-dp.js":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("../../../node_modules/core-js/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__("../../../node_modules/core-js/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__("../../../node_modules/core-js/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__("../../../node_modules/core-js/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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

/***/ "../../../node_modules/core-js/modules/_object-dps.js":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("../../../node_modules/core-js/modules/_object-dp.js");
var anObject = __webpack_require__("../../../node_modules/core-js/modules/_an-object.js");
var getKeys = __webpack_require__("../../../node_modules/core-js/modules/_object-keys.js");

module.exports = __webpack_require__("../../../node_modules/core-js/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_object-gopd.js":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("../../../node_modules/core-js/modules/_object-pie.js");
var createDesc = __webpack_require__("../../../node_modules/core-js/modules/_property-desc.js");
var toIObject = __webpack_require__("../../../node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__("../../../node_modules/core-js/modules/_to-primitive.js");
var has = __webpack_require__("../../../node_modules/core-js/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__("../../../node_modules/core-js/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("../../../node_modules/core-js/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_object-gopn-ext.js":
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__("../../../node_modules/core-js/modules/_to-iobject.js");
var gOPN = __webpack_require__("../../../node_modules/core-js/modules/_object-gopn.js").f;
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

/***/ "../../../node_modules/core-js/modules/_object-gopn.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("../../../node_modules/core-js/modules/_object-keys-internal.js");
var hiddenKeys = __webpack_require__("../../../node_modules/core-js/modules/_enum-bug-keys.js").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_object-gops.js":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "../../../node_modules/core-js/modules/_object-gpo.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("../../../node_modules/core-js/modules/_has.js");
var toObject = __webpack_require__("../../../node_modules/core-js/modules/_to-object.js");
var IE_PROTO = __webpack_require__("../../../node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_object-keys-internal.js":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("../../../node_modules/core-js/modules/_has.js");
var toIObject = __webpack_require__("../../../node_modules/core-js/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__("../../../node_modules/core-js/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__("../../../node_modules/core-js/modules/_shared-key.js")('IE_PROTO');

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

/***/ "../../../node_modules/core-js/modules/_object-keys.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("../../../node_modules/core-js/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__("../../../node_modules/core-js/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_object-pie.js":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "../../../node_modules/core-js/modules/_object-sap.js":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var core = __webpack_require__("../../../node_modules/core-js/modules/_core.js");
var fails = __webpack_require__("../../../node_modules/core-js/modules/_fails.js");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_object-to-array.js":
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__("../../../node_modules/core-js/modules/_object-keys.js");
var toIObject = __webpack_require__("../../../node_modules/core-js/modules/_to-iobject.js");
var isEnum = __webpack_require__("../../../node_modules/core-js/modules/_object-pie.js").f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_own-keys.js":
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__("../../../node_modules/core-js/modules/_object-gopn.js");
var gOPS = __webpack_require__("../../../node_modules/core-js/modules/_object-gops.js");
var anObject = __webpack_require__("../../../node_modules/core-js/modules/_an-object.js");
var Reflect = __webpack_require__("../../../node_modules/core-js/modules/_global.js").Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_perform.js":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_promise-resolve.js":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("../../../node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
var newPromiseCapability = __webpack_require__("../../../node_modules/core-js/modules/_new-promise-capability.js");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_property-desc.js":
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

/***/ "../../../node_modules/core-js/modules/_redefine-all.js":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("../../../node_modules/core-js/modules/_redefine.js");
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_redefine.js":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("../../../node_modules/core-js/modules/_global.js");
var hide = __webpack_require__("../../../node_modules/core-js/modules/_hide.js");
var has = __webpack_require__("../../../node_modules/core-js/modules/_has.js");
var SRC = __webpack_require__("../../../node_modules/core-js/modules/_uid.js")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("../../../node_modules/core-js/modules/_core.js").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/_same-value.js":
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_set-proto.js":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
var anObject = __webpack_require__("../../../node_modules/core-js/modules/_an-object.js");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("../../../node_modules/core-js/modules/_ctx.js")(Function.call, __webpack_require__("../../../node_modules/core-js/modules/_object-gopd.js").f(Object.prototype, '__proto__').set, 2);
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

/***/ "../../../node_modules/core-js/modules/_set-species.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("../../../node_modules/core-js/modules/_global.js");
var dP = __webpack_require__("../../../node_modules/core-js/modules/_object-dp.js");
var DESCRIPTORS = __webpack_require__("../../../node_modules/core-js/modules/_descriptors.js");
var SPECIES = __webpack_require__("../../../node_modules/core-js/modules/_wks.js")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_set-to-string-tag.js":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("../../../node_modules/core-js/modules/_object-dp.js").f;
var has = __webpack_require__("../../../node_modules/core-js/modules/_has.js");
var TAG = __webpack_require__("../../../node_modules/core-js/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_shared-key.js":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("../../../node_modules/core-js/modules/_shared.js")('keys');
var uid = __webpack_require__("../../../node_modules/core-js/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_shared.js":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("../../../node_modules/core-js/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_species-constructor.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("../../../node_modules/core-js/modules/_an-object.js");
var aFunction = __webpack_require__("../../../node_modules/core-js/modules/_a-function.js");
var SPECIES = __webpack_require__("../../../node_modules/core-js/modules/_wks.js")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_string-at.js":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("../../../node_modules/core-js/modules/_to-integer.js");
var defined = __webpack_require__("../../../node_modules/core-js/modules/_defined.js");
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

/***/ "../../../node_modules/core-js/modules/_string-context.js":
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__("../../../node_modules/core-js/modules/_is-regexp.js");
var defined = __webpack_require__("../../../node_modules/core-js/modules/_defined.js");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_string-pad.js":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__("../../../node_modules/core-js/modules/_to-length.js");
var repeat = __webpack_require__("../../../node_modules/core-js/modules/_string-repeat.js");
var defined = __webpack_require__("../../../node_modules/core-js/modules/_defined.js");

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_string-repeat.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__("../../../node_modules/core-js/modules/_to-integer.js");
var defined = __webpack_require__("../../../node_modules/core-js/modules/_defined.js");

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_task.js":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("../../../node_modules/core-js/modules/_ctx.js");
var invoke = __webpack_require__("../../../node_modules/core-js/modules/_invoke.js");
var html = __webpack_require__("../../../node_modules/core-js/modules/_html.js");
var cel = __webpack_require__("../../../node_modules/core-js/modules/_dom-create.js");
var global = __webpack_require__("../../../node_modules/core-js/modules/_global.js");
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
  if (__webpack_require__("../../../node_modules/core-js/modules/_cof.js")(process) == 'process') {
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

/***/ "../../../node_modules/core-js/modules/_to-absolute-index.js":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("../../../node_modules/core-js/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_to-index.js":
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__("../../../node_modules/core-js/modules/_to-integer.js");
var toLength = __webpack_require__("../../../node_modules/core-js/modules/_to-length.js");
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_to-integer.js":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_to-iobject.js":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("../../../node_modules/core-js/modules/_iobject.js");
var defined = __webpack_require__("../../../node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_to-length.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("../../../node_modules/core-js/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_to-object.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("../../../node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_to-primitive.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
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

/***/ "../../../node_modules/core-js/modules/_typed-array.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__("../../../node_modules/core-js/modules/_descriptors.js")) {
  var LIBRARY = __webpack_require__("../../../node_modules/core-js/modules/_library.js");
  var global = __webpack_require__("../../../node_modules/core-js/modules/_global.js");
  var fails = __webpack_require__("../../../node_modules/core-js/modules/_fails.js");
  var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
  var $typed = __webpack_require__("../../../node_modules/core-js/modules/_typed.js");
  var $buffer = __webpack_require__("../../../node_modules/core-js/modules/_typed-buffer.js");
  var ctx = __webpack_require__("../../../node_modules/core-js/modules/_ctx.js");
  var anInstance = __webpack_require__("../../../node_modules/core-js/modules/_an-instance.js");
  var propertyDesc = __webpack_require__("../../../node_modules/core-js/modules/_property-desc.js");
  var hide = __webpack_require__("../../../node_modules/core-js/modules/_hide.js");
  var redefineAll = __webpack_require__("../../../node_modules/core-js/modules/_redefine-all.js");
  var toInteger = __webpack_require__("../../../node_modules/core-js/modules/_to-integer.js");
  var toLength = __webpack_require__("../../../node_modules/core-js/modules/_to-length.js");
  var toIndex = __webpack_require__("../../../node_modules/core-js/modules/_to-index.js");
  var toAbsoluteIndex = __webpack_require__("../../../node_modules/core-js/modules/_to-absolute-index.js");
  var toPrimitive = __webpack_require__("../../../node_modules/core-js/modules/_to-primitive.js");
  var has = __webpack_require__("../../../node_modules/core-js/modules/_has.js");
  var classof = __webpack_require__("../../../node_modules/core-js/modules/_classof.js");
  var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
  var toObject = __webpack_require__("../../../node_modules/core-js/modules/_to-object.js");
  var isArrayIter = __webpack_require__("../../../node_modules/core-js/modules/_is-array-iter.js");
  var create = __webpack_require__("../../../node_modules/core-js/modules/_object-create.js");
  var getPrototypeOf = __webpack_require__("../../../node_modules/core-js/modules/_object-gpo.js");
  var gOPN = __webpack_require__("../../../node_modules/core-js/modules/_object-gopn.js").f;
  var getIterFn = __webpack_require__("../../../node_modules/core-js/modules/core.get-iterator-method.js");
  var uid = __webpack_require__("../../../node_modules/core-js/modules/_uid.js");
  var wks = __webpack_require__("../../../node_modules/core-js/modules/_wks.js");
  var createArrayMethod = __webpack_require__("../../../node_modules/core-js/modules/_array-methods.js");
  var createArrayIncludes = __webpack_require__("../../../node_modules/core-js/modules/_array-includes.js");
  var speciesConstructor = __webpack_require__("../../../node_modules/core-js/modules/_species-constructor.js");
  var ArrayIterators = __webpack_require__("../../../node_modules/core-js/modules/es6.array.iterator.js");
  var Iterators = __webpack_require__("../../../node_modules/core-js/modules/_iterators.js");
  var $iterDetect = __webpack_require__("../../../node_modules/core-js/modules/_iter-detect.js");
  var setSpecies = __webpack_require__("../../../node_modules/core-js/modules/_set-species.js");
  var arrayFill = __webpack_require__("../../../node_modules/core-js/modules/_array-fill.js");
  var arrayCopyWithin = __webpack_require__("../../../node_modules/core-js/modules/_array-copy-within.js");
  var $DP = __webpack_require__("../../../node_modules/core-js/modules/_object-dp.js");
  var $GOPD = __webpack_require__("../../../node_modules/core-js/modules/_object-gopd.js");
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),

/***/ "../../../node_modules/core-js/modules/_typed-buffer.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("../../../node_modules/core-js/modules/_global.js");
var DESCRIPTORS = __webpack_require__("../../../node_modules/core-js/modules/_descriptors.js");
var LIBRARY = __webpack_require__("../../../node_modules/core-js/modules/_library.js");
var $typed = __webpack_require__("../../../node_modules/core-js/modules/_typed.js");
var hide = __webpack_require__("../../../node_modules/core-js/modules/_hide.js");
var redefineAll = __webpack_require__("../../../node_modules/core-js/modules/_redefine-all.js");
var fails = __webpack_require__("../../../node_modules/core-js/modules/_fails.js");
var anInstance = __webpack_require__("../../../node_modules/core-js/modules/_an-instance.js");
var toInteger = __webpack_require__("../../../node_modules/core-js/modules/_to-integer.js");
var toLength = __webpack_require__("../../../node_modules/core-js/modules/_to-length.js");
var toIndex = __webpack_require__("../../../node_modules/core-js/modules/_to-index.js");
var gOPN = __webpack_require__("../../../node_modules/core-js/modules/_object-gopn.js").f;
var dP = __webpack_require__("../../../node_modules/core-js/modules/_object-dp.js").f;
var arrayFill = __webpack_require__("../../../node_modules/core-js/modules/_array-fill.js");
var setToStringTag = __webpack_require__("../../../node_modules/core-js/modules/_set-to-string-tag.js");
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),

/***/ "../../../node_modules/core-js/modules/_typed.js":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("../../../node_modules/core-js/modules/_global.js");
var hide = __webpack_require__("../../../node_modules/core-js/modules/_hide.js");
var uid = __webpack_require__("../../../node_modules/core-js/modules/_uid.js");
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_uid.js":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_user-agent.js":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("../../../node_modules/core-js/modules/_global.js");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "../../../node_modules/core-js/modules/_validate-collection.js":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_wks-define.js":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("../../../node_modules/core-js/modules/_global.js");
var core = __webpack_require__("../../../node_modules/core-js/modules/_core.js");
var LIBRARY = __webpack_require__("../../../node_modules/core-js/modules/_library.js");
var wksExt = __webpack_require__("../../../node_modules/core-js/modules/_wks-ext.js");
var defineProperty = __webpack_require__("../../../node_modules/core-js/modules/_object-dp.js").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/_wks-ext.js":
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__("../../../node_modules/core-js/modules/_wks.js");


/***/ }),

/***/ "../../../node_modules/core-js/modules/_wks.js":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("../../../node_modules/core-js/modules/_shared.js")('wks');
var uid = __webpack_require__("../../../node_modules/core-js/modules/_uid.js");
var Symbol = __webpack_require__("../../../node_modules/core-js/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "../../../node_modules/core-js/modules/core.get-iterator-method.js":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("../../../node_modules/core-js/modules/_classof.js");
var ITERATOR = __webpack_require__("../../../node_modules/core-js/modules/_wks.js")('iterator');
var Iterators = __webpack_require__("../../../node_modules/core-js/modules/_iterators.js");
module.exports = __webpack_require__("../../../node_modules/core-js/modules/_core.js").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.array.copy-within.js":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");

$export($export.P, 'Array', { copyWithin: __webpack_require__("../../../node_modules/core-js/modules/_array-copy-within.js") });

__webpack_require__("../../../node_modules/core-js/modules/_add-to-unscopables.js")('copyWithin');


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.array.fill.js":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");

$export($export.P, 'Array', { fill: __webpack_require__("../../../node_modules/core-js/modules/_array-fill.js") });

__webpack_require__("../../../node_modules/core-js/modules/_add-to-unscopables.js")('fill');


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.array.find-index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var $find = __webpack_require__("../../../node_modules/core-js/modules/_array-methods.js")(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__("../../../node_modules/core-js/modules/_add-to-unscopables.js")(KEY);


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.array.find.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var $find = __webpack_require__("../../../node_modules/core-js/modules/_array-methods.js")(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__("../../../node_modules/core-js/modules/_add-to-unscopables.js")(KEY);


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.array.from.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__("../../../node_modules/core-js/modules/_ctx.js");
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var toObject = __webpack_require__("../../../node_modules/core-js/modules/_to-object.js");
var call = __webpack_require__("../../../node_modules/core-js/modules/_iter-call.js");
var isArrayIter = __webpack_require__("../../../node_modules/core-js/modules/_is-array-iter.js");
var toLength = __webpack_require__("../../../node_modules/core-js/modules/_to-length.js");
var createProperty = __webpack_require__("../../../node_modules/core-js/modules/_create-property.js");
var getIterFn = __webpack_require__("../../../node_modules/core-js/modules/core.get-iterator-method.js");

$export($export.S + $export.F * !__webpack_require__("../../../node_modules/core-js/modules/_iter-detect.js")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.array.iterator.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("../../../node_modules/core-js/modules/_add-to-unscopables.js");
var step = __webpack_require__("../../../node_modules/core-js/modules/_iter-step.js");
var Iterators = __webpack_require__("../../../node_modules/core-js/modules/_iterators.js");
var toIObject = __webpack_require__("../../../node_modules/core-js/modules/_to-iobject.js");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("../../../node_modules/core-js/modules/_iter-define.js")(Array, 'Array', function (iterated, kind) {
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

/***/ "../../../node_modules/core-js/modules/es6.array.of.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var createProperty = __webpack_require__("../../../node_modules/core-js/modules/_create-property.js");

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__("../../../node_modules/core-js/modules/_fails.js")(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.function.name.js":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("../../../node_modules/core-js/modules/_object-dp.js").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("../../../node_modules/core-js/modules/_descriptors.js") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.map.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__("../../../node_modules/core-js/modules/_collection-strong.js");
var validate = __webpack_require__("../../../node_modules/core-js/modules/_validate-collection.js");
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__("../../../node_modules/core-js/modules/_collection.js")(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.math.acosh.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var log1p = __webpack_require__("../../../node_modules/core-js/modules/_math-log1p.js");
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.math.asinh.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.math.atanh.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.math.cbrt.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var sign = __webpack_require__("../../../node_modules/core-js/modules/_math-sign.js");

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.math.clz32.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.math.cosh.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.math.expm1.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var $expm1 = __webpack_require__("../../../node_modules/core-js/modules/_math-expm1.js");

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.math.fround.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', { fround: __webpack_require__("../../../node_modules/core-js/modules/_math-fround.js") });


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.math.hypot.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.math.imul.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__("../../../node_modules/core-js/modules/_fails.js")(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.math.log10.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.math.log1p.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', { log1p: __webpack_require__("../../../node_modules/core-js/modules/_math-log1p.js") });


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.math.log2.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.math.sign.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', { sign: __webpack_require__("../../../node_modules/core-js/modules/_math-sign.js") });


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.math.sinh.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var expm1 = __webpack_require__("../../../node_modules/core-js/modules/_math-expm1.js");
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__("../../../node_modules/core-js/modules/_fails.js")(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.math.tanh.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var expm1 = __webpack_require__("../../../node_modules/core-js/modules/_math-expm1.js");
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.math.trunc.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.number.epsilon.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.number.is-finite.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var _isFinite = __webpack_require__("../../../node_modules/core-js/modules/_global.js").isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.number.is-integer.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', { isInteger: __webpack_require__("../../../node_modules/core-js/modules/_is-integer.js") });


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.number.is-nan.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.number.is-safe-integer.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var isInteger = __webpack_require__("../../../node_modules/core-js/modules/_is-integer.js");
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.number.max-safe-integer.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.number.min-safe-integer.js":
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.object.assign.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__("../../../node_modules/core-js/modules/_object-assign.js") });


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.object.freeze.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
var meta = __webpack_require__("../../../node_modules/core-js/modules/_meta.js").onFreeze;

__webpack_require__("../../../node_modules/core-js/modules/_object-sap.js")('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.object.get-own-property-descriptor.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__("../../../node_modules/core-js/modules/_to-iobject.js");
var $getOwnPropertyDescriptor = __webpack_require__("../../../node_modules/core-js/modules/_object-gopd.js").f;

__webpack_require__("../../../node_modules/core-js/modules/_object-sap.js")('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.object.get-own-property-names.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__("../../../node_modules/core-js/modules/_object-sap.js")('getOwnPropertyNames', function () {
  return __webpack_require__("../../../node_modules/core-js/modules/_object-gopn-ext.js").f;
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.object.get-prototype-of.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__("../../../node_modules/core-js/modules/_to-object.js");
var $getPrototypeOf = __webpack_require__("../../../node_modules/core-js/modules/_object-gpo.js");

__webpack_require__("../../../node_modules/core-js/modules/_object-sap.js")('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.object.is-extensible.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");

__webpack_require__("../../../node_modules/core-js/modules/_object-sap.js")('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.object.is-frozen.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");

__webpack_require__("../../../node_modules/core-js/modules/_object-sap.js")('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.object.is-sealed.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");

__webpack_require__("../../../node_modules/core-js/modules/_object-sap.js")('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.object.is.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
$export($export.S, 'Object', { is: __webpack_require__("../../../node_modules/core-js/modules/_same-value.js") });


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.object.keys.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("../../../node_modules/core-js/modules/_to-object.js");
var $keys = __webpack_require__("../../../node_modules/core-js/modules/_object-keys.js");

__webpack_require__("../../../node_modules/core-js/modules/_object-sap.js")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.object.prevent-extensions.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
var meta = __webpack_require__("../../../node_modules/core-js/modules/_meta.js").onFreeze;

__webpack_require__("../../../node_modules/core-js/modules/_object-sap.js")('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.object.seal.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
var meta = __webpack_require__("../../../node_modules/core-js/modules/_meta.js").onFreeze;

__webpack_require__("../../../node_modules/core-js/modules/_object-sap.js")('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.object.set-prototype-of.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__("../../../node_modules/core-js/modules/_set-proto.js").set });


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.promise.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("../../../node_modules/core-js/modules/_library.js");
var global = __webpack_require__("../../../node_modules/core-js/modules/_global.js");
var ctx = __webpack_require__("../../../node_modules/core-js/modules/_ctx.js");
var classof = __webpack_require__("../../../node_modules/core-js/modules/_classof.js");
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
var aFunction = __webpack_require__("../../../node_modules/core-js/modules/_a-function.js");
var anInstance = __webpack_require__("../../../node_modules/core-js/modules/_an-instance.js");
var forOf = __webpack_require__("../../../node_modules/core-js/modules/_for-of.js");
var speciesConstructor = __webpack_require__("../../../node_modules/core-js/modules/_species-constructor.js");
var task = __webpack_require__("../../../node_modules/core-js/modules/_task.js").set;
var microtask = __webpack_require__("../../../node_modules/core-js/modules/_microtask.js")();
var newPromiseCapabilityModule = __webpack_require__("../../../node_modules/core-js/modules/_new-promise-capability.js");
var perform = __webpack_require__("../../../node_modules/core-js/modules/_perform.js");
var promiseResolve = __webpack_require__("../../../node_modules/core-js/modules/_promise-resolve.js");
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
    var FakePromise = (promise.constructor = {})[__webpack_require__("../../../node_modules/core-js/modules/_wks.js")('species')] = function (exec) {
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
  Internal.prototype = __webpack_require__("../../../node_modules/core-js/modules/_redefine-all.js")($Promise.prototype, {
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
__webpack_require__("../../../node_modules/core-js/modules/_set-to-string-tag.js")($Promise, PROMISE);
__webpack_require__("../../../node_modules/core-js/modules/_set-species.js")(PROMISE);
Wrapper = __webpack_require__("../../../node_modules/core-js/modules/_core.js")[PROMISE];

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
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__("../../../node_modules/core-js/modules/_iter-detect.js")(function (iter) {
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

/***/ "../../../node_modules/core-js/modules/es6.reflect.apply.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var aFunction = __webpack_require__("../../../node_modules/core-js/modules/_a-function.js");
var anObject = __webpack_require__("../../../node_modules/core-js/modules/_an-object.js");
var rApply = (__webpack_require__("../../../node_modules/core-js/modules/_global.js").Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__("../../../node_modules/core-js/modules/_fails.js")(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.reflect.construct.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var create = __webpack_require__("../../../node_modules/core-js/modules/_object-create.js");
var aFunction = __webpack_require__("../../../node_modules/core-js/modules/_a-function.js");
var anObject = __webpack_require__("../../../node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
var fails = __webpack_require__("../../../node_modules/core-js/modules/_fails.js");
var bind = __webpack_require__("../../../node_modules/core-js/modules/_bind.js");
var rConstruct = (__webpack_require__("../../../node_modules/core-js/modules/_global.js").Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.reflect.define-property.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__("../../../node_modules/core-js/modules/_object-dp.js");
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var anObject = __webpack_require__("../../../node_modules/core-js/modules/_an-object.js");
var toPrimitive = __webpack_require__("../../../node_modules/core-js/modules/_to-primitive.js");

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__("../../../node_modules/core-js/modules/_fails.js")(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.reflect.delete-property.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var gOPD = __webpack_require__("../../../node_modules/core-js/modules/_object-gopd.js").f;
var anObject = __webpack_require__("../../../node_modules/core-js/modules/_an-object.js");

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__("../../../node_modules/core-js/modules/_object-gopd.js");
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var anObject = __webpack_require__("../../../node_modules/core-js/modules/_an-object.js");

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.reflect.get-prototype-of.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var getProto = __webpack_require__("../../../node_modules/core-js/modules/_object-gpo.js");
var anObject = __webpack_require__("../../../node_modules/core-js/modules/_an-object.js");

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.reflect.get.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__("../../../node_modules/core-js/modules/_object-gopd.js");
var getPrototypeOf = __webpack_require__("../../../node_modules/core-js/modules/_object-gpo.js");
var has = __webpack_require__("../../../node_modules/core-js/modules/_has.js");
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
var anObject = __webpack_require__("../../../node_modules/core-js/modules/_an-object.js");

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.reflect.has.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.reflect.is-extensible.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var anObject = __webpack_require__("../../../node_modules/core-js/modules/_an-object.js");
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.reflect.own-keys.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Reflect', { ownKeys: __webpack_require__("../../../node_modules/core-js/modules/_own-keys.js") });


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.reflect.prevent-extensions.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var anObject = __webpack_require__("../../../node_modules/core-js/modules/_an-object.js");
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.reflect.set-prototype-of.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var setProto = __webpack_require__("../../../node_modules/core-js/modules/_set-proto.js");

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.reflect.set.js":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__("../../../node_modules/core-js/modules/_object-dp.js");
var gOPD = __webpack_require__("../../../node_modules/core-js/modules/_object-gopd.js");
var getPrototypeOf = __webpack_require__("../../../node_modules/core-js/modules/_object-gpo.js");
var has = __webpack_require__("../../../node_modules/core-js/modules/_has.js");
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var createDesc = __webpack_require__("../../../node_modules/core-js/modules/_property-desc.js");
var anObject = __webpack_require__("../../../node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.regexp.flags.js":
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__("../../../node_modules/core-js/modules/_descriptors.js") && /./g.flags != 'g') __webpack_require__("../../../node_modules/core-js/modules/_object-dp.js").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__("../../../node_modules/core-js/modules/_flags.js")
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.regexp.match.js":
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__("../../../node_modules/core-js/modules/_fix-re-wks.js")('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.regexp.replace.js":
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__("../../../node_modules/core-js/modules/_fix-re-wks.js")('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.regexp.search.js":
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__("../../../node_modules/core-js/modules/_fix-re-wks.js")('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.regexp.split.js":
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__("../../../node_modules/core-js/modules/_fix-re-wks.js")('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__("../../../node_modules/core-js/modules/_is-regexp.js");
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.set.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__("../../../node_modules/core-js/modules/_collection-strong.js");
var validate = __webpack_require__("../../../node_modules/core-js/modules/_validate-collection.js");
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__("../../../node_modules/core-js/modules/_collection.js")(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.string.code-point-at.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var $at = __webpack_require__("../../../node_modules/core-js/modules/_string-at.js")(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.string.ends-with.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var toLength = __webpack_require__("../../../node_modules/core-js/modules/_to-length.js");
var context = __webpack_require__("../../../node_modules/core-js/modules/_string-context.js");
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__("../../../node_modules/core-js/modules/_fails-is-regexp.js")(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.string.from-code-point.js":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var toAbsoluteIndex = __webpack_require__("../../../node_modules/core-js/modules/_to-absolute-index.js");
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.string.includes.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var context = __webpack_require__("../../../node_modules/core-js/modules/_string-context.js");
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__("../../../node_modules/core-js/modules/_fails-is-regexp.js")(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.string.raw.js":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var toIObject = __webpack_require__("../../../node_modules/core-js/modules/_to-iobject.js");
var toLength = __webpack_require__("../../../node_modules/core-js/modules/_to-length.js");

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.string.repeat.js":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__("../../../node_modules/core-js/modules/_string-repeat.js")
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.string.starts-with.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var toLength = __webpack_require__("../../../node_modules/core-js/modules/_to-length.js");
var context = __webpack_require__("../../../node_modules/core-js/modules/_string-context.js");
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__("../../../node_modules/core-js/modules/_fails-is-regexp.js")(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.symbol.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__("../../../node_modules/core-js/modules/_global.js");
var has = __webpack_require__("../../../node_modules/core-js/modules/_has.js");
var DESCRIPTORS = __webpack_require__("../../../node_modules/core-js/modules/_descriptors.js");
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__("../../../node_modules/core-js/modules/_redefine.js");
var META = __webpack_require__("../../../node_modules/core-js/modules/_meta.js").KEY;
var $fails = __webpack_require__("../../../node_modules/core-js/modules/_fails.js");
var shared = __webpack_require__("../../../node_modules/core-js/modules/_shared.js");
var setToStringTag = __webpack_require__("../../../node_modules/core-js/modules/_set-to-string-tag.js");
var uid = __webpack_require__("../../../node_modules/core-js/modules/_uid.js");
var wks = __webpack_require__("../../../node_modules/core-js/modules/_wks.js");
var wksExt = __webpack_require__("../../../node_modules/core-js/modules/_wks-ext.js");
var wksDefine = __webpack_require__("../../../node_modules/core-js/modules/_wks-define.js");
var enumKeys = __webpack_require__("../../../node_modules/core-js/modules/_enum-keys.js");
var isArray = __webpack_require__("../../../node_modules/core-js/modules/_is-array.js");
var anObject = __webpack_require__("../../../node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
var toIObject = __webpack_require__("../../../node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__("../../../node_modules/core-js/modules/_to-primitive.js");
var createDesc = __webpack_require__("../../../node_modules/core-js/modules/_property-desc.js");
var _create = __webpack_require__("../../../node_modules/core-js/modules/_object-create.js");
var gOPNExt = __webpack_require__("../../../node_modules/core-js/modules/_object-gopn-ext.js");
var $GOPD = __webpack_require__("../../../node_modules/core-js/modules/_object-gopd.js");
var $DP = __webpack_require__("../../../node_modules/core-js/modules/_object-dp.js");
var $keys = __webpack_require__("../../../node_modules/core-js/modules/_object-keys.js");
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
  __webpack_require__("../../../node_modules/core-js/modules/_object-gopn.js").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__("../../../node_modules/core-js/modules/_object-pie.js").f = $propertyIsEnumerable;
  __webpack_require__("../../../node_modules/core-js/modules/_object-gops.js").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__("../../../node_modules/core-js/modules/_library.js")) {
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
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__("../../../node_modules/core-js/modules/_hide.js")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.typed.array-buffer.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var $typed = __webpack_require__("../../../node_modules/core-js/modules/_typed.js");
var buffer = __webpack_require__("../../../node_modules/core-js/modules/_typed-buffer.js");
var anObject = __webpack_require__("../../../node_modules/core-js/modules/_an-object.js");
var toAbsoluteIndex = __webpack_require__("../../../node_modules/core-js/modules/_to-absolute-index.js");
var toLength = __webpack_require__("../../../node_modules/core-js/modules/_to-length.js");
var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
var ArrayBuffer = __webpack_require__("../../../node_modules/core-js/modules/_global.js").ArrayBuffer;
var speciesConstructor = __webpack_require__("../../../node_modules/core-js/modules/_species-constructor.js");
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__("../../../node_modules/core-js/modules/_fails.js")(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__("../../../node_modules/core-js/modules/_set-species.js")(ARRAY_BUFFER);


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.typed.float32-array.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../node_modules/core-js/modules/_typed-array.js")('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.typed.float64-array.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../node_modules/core-js/modules/_typed-array.js")('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.typed.int16-array.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../node_modules/core-js/modules/_typed-array.js")('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.typed.int32-array.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../node_modules/core-js/modules/_typed-array.js")('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.typed.int8-array.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../node_modules/core-js/modules/_typed-array.js")('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.typed.uint16-array.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../node_modules/core-js/modules/_typed-array.js")('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.typed.uint32-array.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../node_modules/core-js/modules/_typed-array.js")('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.typed.uint8-array.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../node_modules/core-js/modules/_typed-array.js")('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.typed.uint8-clamped-array.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../node_modules/core-js/modules/_typed-array.js")('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.weak-map.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__("../../../node_modules/core-js/modules/_array-methods.js")(0);
var redefine = __webpack_require__("../../../node_modules/core-js/modules/_redefine.js");
var meta = __webpack_require__("../../../node_modules/core-js/modules/_meta.js");
var assign = __webpack_require__("../../../node_modules/core-js/modules/_object-assign.js");
var weak = __webpack_require__("../../../node_modules/core-js/modules/_collection-weak.js");
var isObject = __webpack_require__("../../../node_modules/core-js/modules/_is-object.js");
var fails = __webpack_require__("../../../node_modules/core-js/modules/_fails.js");
var validate = __webpack_require__("../../../node_modules/core-js/modules/_validate-collection.js");
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__("../../../node_modules/core-js/modules/_collection.js")(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),

/***/ "../../../node_modules/core-js/modules/es6.weak-set.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__("../../../node_modules/core-js/modules/_collection-weak.js");
var validate = __webpack_require__("../../../node_modules/core-js/modules/_validate-collection.js");
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__("../../../node_modules/core-js/modules/_collection.js")(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),

/***/ "../../../node_modules/core-js/modules/es7.array.includes.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var $includes = __webpack_require__("../../../node_modules/core-js/modules/_array-includes.js")(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__("../../../node_modules/core-js/modules/_add-to-unscopables.js")('includes');


/***/ }),

/***/ "../../../node_modules/core-js/modules/es7.object.entries.js":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var $entries = __webpack_require__("../../../node_modules/core-js/modules/_object-to-array.js")(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es7.object.get-own-property-descriptors.js":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var ownKeys = __webpack_require__("../../../node_modules/core-js/modules/_own-keys.js");
var toIObject = __webpack_require__("../../../node_modules/core-js/modules/_to-iobject.js");
var gOPD = __webpack_require__("../../../node_modules/core-js/modules/_object-gopd.js");
var createProperty = __webpack_require__("../../../node_modules/core-js/modules/_create-property.js");

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es7.object.values.js":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var $values = __webpack_require__("../../../node_modules/core-js/modules/_object-to-array.js")(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es7.string.pad-end.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var $pad = __webpack_require__("../../../node_modules/core-js/modules/_string-pad.js");
var userAgent = __webpack_require__("../../../node_modules/core-js/modules/_user-agent.js");

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/es7.string.pad-start.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var $pad = __webpack_require__("../../../node_modules/core-js/modules/_string-pad.js");
var userAgent = __webpack_require__("../../../node_modules/core-js/modules/_user-agent.js");

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/web.dom.iterable.js":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("../../../node_modules/core-js/modules/es6.array.iterator.js");
var getKeys = __webpack_require__("../../../node_modules/core-js/modules/_object-keys.js");
var redefine = __webpack_require__("../../../node_modules/core-js/modules/_redefine.js");
var global = __webpack_require__("../../../node_modules/core-js/modules/_global.js");
var hide = __webpack_require__("../../../node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__("../../../node_modules/core-js/modules/_iterators.js");
var wks = __webpack_require__("../../../node_modules/core-js/modules/_wks.js");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "../../../node_modules/core-js/modules/web.immediate.js":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var $task = __webpack_require__("../../../node_modules/core-js/modules/_task.js");
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),

/***/ "../../../node_modules/core-js/modules/web.timers.js":
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__("../../../node_modules/core-js/modules/_global.js");
var $export = __webpack_require__("../../../node_modules/core-js/modules/_export.js");
var userAgent = __webpack_require__("../../../node_modules/core-js/modules/_user-agent.js");
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),

/***/ "../../../node_modules/regenerator-runtime/runtime.js":
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


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
    iframeSrcPath: ''
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

      return (0, _get3.default)(IframeLoader.prototype.__proto__ || (0, _getPrototypeOf2.default)(IframeLoader.prototype), 'load', this).call(this, configParam).then(function () {
        // assign API to this object to make calls more succint
        _this4.api = _this4.compLoader.api;
        // make sure iframe and iframeSrcPath are set to values if not
        // configured by standard mechanisms. At this point, default
        // values from ./defaults/loader.js will be used.
        _this4.config.iframe = _this4.config.iframe || {};
        _this4.config.iframe.iframeSrcPath = _this4.config.iframe.iframeSrcPath || _this4.mergeSrcPath(configParam);
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
          var url = _this.options.configUrl.match('^http') ? _this.options.configUrl : '' + _this.options.baseUrl + _this.options.configUrl;
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
      return this.options && this.options.shouldIgnoreConfigWhenEmbedded && url.indexOf('lexWebUiEmbed=true') !== -1 ? { ui: { parentOrigin: parentOrigin } } : config;
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

      if (['script', 'css'].indexOf(type) === -1) {
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
      var url = minUrl.match('^http') ? minUrl : '' + baseUrl + minUrl;

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

var _loginutil = __webpack_require__("./lib/loginutil.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Instantiates and mounts the chatbot component
 *
 * Assumes that the LexWebUi and Vue libraries have been loaded in the global
 * scope
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

/* eslint no-console: ["error", { allow: ["warn", "error", "debug"] }] */
/* global AWS LexWebUi Vue $ */
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

  (0, _createClass3.default)(FullPageComponentLoader, [{
    key: 'generateConfigObj',
    value: function generateConfigObj() {
      var config = {
        appUserPoolClientId: this.config.cognito.appUserPoolClientId,
        appDomainName: this.config.cognito.appDomainName,
        appUserPoolIdentityProvider: this.config.cognito.appUserPoolIdentityProvider
      };
      return config;
    }
  }, {
    key: 'requestTokens',
    value: function requestTokens() {
      var existingAuth = (0, _loginutil.getAuth)(this.generateConfigObj());
      var existingSession = existingAuth.getSignInUserSession();
      if (existingSession.isValid()) {
        var tokens = {};
        tokens.idtokenjwt = localStorage.getItem('idtokenjwt');
        tokens.accesstokenjwt = localStorage.getItem('accesstokenjwt');
        tokens.refreshtoken = localStorage.getItem('refreshtoken');
        FullPageComponentLoader.sendMessageToComponent({
          event: 'confirmLogin',
          data: tokens
        });
      }
    }

    /**
     * Creates Cognito credentials and processes Cognito login if complete
     * Inits this.credentials
     */

  }, {
    key: 'initCognitoCredentials',
    value: function initCognitoCredentials() {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        var curUrl = window.location.href;
        if (curUrl.indexOf('loggedin') >= 0) {
          if ((0, _loginutil.completeLogin)(_this.generateConfigObj())) {
            var auth = (0, _loginutil.getAuth)(_this.generateConfigObj());
            var session = auth.getSignInUserSession();
            if (session.isValid()) {
              var tokens = {};
              tokens.idtokenjwt = localStorage.getItem('idtokenjwt');
              tokens.accesstokenjwt = localStorage.getItem('accesstokenjwt');
              tokens.refreshtoken = localStorage.getItem('refreshtoken');
              FullPageComponentLoader.sendMessageToComponent({
                event: 'confirmLogin',
                data: tokens
              });
            }
          }
        } else if (curUrl.indexOf('loggedout') >= 0) {
          if ((0, _loginutil.completeLogout)(_this.generateConfigObj())) {
            FullPageComponentLoader.sendMessageToComponent({ event: 'confirmLogout' });
          }
        }
        var cognitoPoolId = _this.config.cognito.poolId;

        var region = _this.config.cognito.region || _this.config.region || 'us-east-1';
        var poolName = 'cognito-idp.us-east-1.amazonaws.com/' + _this.config.cognito.appUserPoolName;
        if (!cognitoPoolId) {
          return reject(new Error('missing cognito poolId config'));
        }

        if (!('AWS' in window) || !('CognitoIdentityCredentials' in window.AWS)) {
          return reject(new Error('unable to find AWS SDK global object'));
        }

        var credentials = void 0;
        var idtoken = localStorage.getItem('idtokenjwt');
        if (idtoken) {
          // auth role since logged in
          try {
            var logins = {};
            logins[poolName] = idtoken;
            credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: cognitoPoolId }, { region: region });
          } catch (err) {
            reject(new Error('cognito auth credentials could not be created ' + err));
          }
        } else {
          // noauth role
          try {
            credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: cognitoPoolId }, { region: region });
          } catch (err) {
            reject(new Error('cognito noauth credentials could not be created ' + err));
          }
        }
        // get and assign credentials
        return credentials.getPromise().then(function () {
          _this.credentials = credentials;
          resolve();
        });
      });
    }

    /**
     * Event handler functions for messages from iframe
     * Used by onMessageFromIframe - "this" object is bound dynamically
     */

  }, {
    key: 'initBotMessageHandlers',
    value: function initBotMessageHandlers() {
      var _this2 = this;

      $(document).on('fullpagecomponent', function (evt) {
        if (evt.detail.event === 'requestLogin') {
          (0, _loginutil.login)(_this2.generateConfigObj());
        } else if (evt.detail.event === 'requestLogout') {
          (0, _loginutil.logout)(_this2.generateConfigObj());
        } else if (evt.detail.event === 'requestTokens') {
          _this2.requestTokens();
        }
      });
    }

    /**
     * Add postMessage event handler to receive messages from iframe
     */

  }, {
    key: 'setupBotMessageListener',
    value: function setupBotMessageListener() {
      var _this3 = this;

      return new _promise2.default(function (resolve, reject) {
        try {
          _this3.initBotMessageHandlers();
          resolve();
        } catch (err) {
          console.error('Could not setup message handlers: ' + err);
          reject(err);
        }
      });
    }
  }, {
    key: 'isRunningEmbeded',
    value: function isRunningEmbeded() {
      var url = window.location.href;
      this.runningEmbeded = url.indexOf('lexWebUiEmbed=true') !== -1;
      return this.runningEmbeded;
    }

    /**
     * Loads the component into the DOM
     * configParam overrides at runtime the chatbot UI config
     */

  }, {
    key: 'load',
    value: function load(configParam) {
      var _this4 = this;

      var mergedConfig = _configLoader.ConfigLoader.mergeConfig(this.config, configParam);
      this.config = mergedConfig;
      if (this.isRunningEmbeded()) {
        return FullPageComponentLoader.createComponent(mergedConfig).then(function (lexWebUi) {
          return FullPageComponentLoader.mountComponent(_this4.elementId, lexWebUi);
        });
      }
      return _promise2.default.all([this.initCognitoCredentials(), this.setupBotMessageListener()]).then(function () {
        FullPageComponentLoader.createComponent(mergedConfig).then(function (lexWebUi) {
          FullPageComponentLoader.mountComponent(_this4.elementId, lexWebUi);
        });
      });
    }

    /**
     * Send a message to the component
     */

  }], [{
    key: 'sendMessageToComponent',
    value: function sendMessageToComponent(message) {
      return new _promise2.default(function (resolve, reject) {
        try {
          var myEvent = new CustomEvent('lexwebuicomponent', { detail: message });
          document.dispatchEvent(myEvent);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    }

    /**
     * Instantiates the LexWebUi component
     *
     * Returns a promise that resolves to the component
     */

  }, {
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
}();

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

__webpack_require__("../../../node_modules/core-js/modules/es6.typed.array-buffer.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.typed.int8-array.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.typed.uint8-array.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.typed.uint8-clamped-array.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.typed.int16-array.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.typed.uint16-array.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.typed.int32-array.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.typed.uint32-array.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.typed.float32-array.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.typed.float64-array.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.map.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.set.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.weak-map.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.weak-set.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.reflect.apply.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.reflect.construct.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.reflect.define-property.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.reflect.delete-property.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.reflect.get.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.reflect.get-prototype-of.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.reflect.has.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.reflect.is-extensible.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.reflect.own-keys.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.reflect.prevent-extensions.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.reflect.set.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.reflect.set-prototype-of.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.promise.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.symbol.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.object.freeze.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.object.seal.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.object.prevent-extensions.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.object.is-frozen.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.object.is-sealed.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.object.is-extensible.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.object.get-own-property-descriptor.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.object.get-prototype-of.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.object.keys.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.object.get-own-property-names.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.object.assign.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.object.is.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.object.set-prototype-of.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.function.name.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.string.raw.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.string.from-code-point.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.string.code-point-at.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.string.repeat.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.string.starts-with.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.string.ends-with.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.string.includes.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.regexp.flags.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.regexp.match.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.regexp.replace.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.regexp.split.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.regexp.search.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.array.from.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.array.of.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.array.copy-within.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.array.find.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.array.find-index.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.array.fill.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.array.iterator.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.number.is-finite.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.number.is-integer.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.number.is-safe-integer.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.number.is-nan.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.number.epsilon.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.number.min-safe-integer.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.number.max-safe-integer.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.math.acosh.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.math.asinh.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.math.atanh.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.math.cbrt.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.math.clz32.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.math.cosh.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.math.expm1.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.math.fround.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.math.hypot.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.math.imul.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.math.log1p.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.math.log10.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.math.log2.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.math.sign.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.math.sinh.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.math.tanh.js");

__webpack_require__("../../../node_modules/core-js/modules/es6.math.trunc.js");

__webpack_require__("../../../node_modules/core-js/modules/es7.array.includes.js");

__webpack_require__("../../../node_modules/core-js/modules/es7.object.values.js");

__webpack_require__("../../../node_modules/core-js/modules/es7.object.entries.js");

__webpack_require__("../../../node_modules/core-js/modules/es7.object.get-own-property-descriptors.js");

__webpack_require__("../../../node_modules/core-js/modules/es7.string.pad-start.js");

__webpack_require__("../../../node_modules/core-js/modules/es7.string.pad-end.js");

__webpack_require__("../../../node_modules/core-js/modules/web.timers.js");

__webpack_require__("../../../node_modules/core-js/modules/web.immediate.js");

__webpack_require__("../../../node_modules/core-js/modules/web.dom.iterable.js");

__webpack_require__("../../../node_modules/regenerator-runtime/runtime.js");

var _configLoader = __webpack_require__("./lib/config-loader.js");

var _loginutil = __webpack_require__("./lib/loginutil.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Instantiates and mounts the chatbot component in an iframe
 *
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

/* eslint no-console: ["error", { allow: ["warn", "error", "debug"] }] */
/* global AWS */

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
      if (iframeConfig.shouldLoadIframeMinimized === undefined) {
        this.config.iframe.shouldLoadIframeMinimized = true;
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
  }, {
    key: 'generateConfigObj',
    value: function generateConfigObj() {
      var config = {
        appUserPoolClientId: this.config.cognito.appUserPoolClientId,
        appDomainName: this.config.cognito.appDomainName,
        appUserPoolIdentityProvider: this.config.cognito.appUserPoolIdentityProvider
      };
      return config;
    }

    /**
     * Creates Cognito credentials and processes Cognito login if complete
     * Inits this.credentials
     */

  }, {
    key: 'initCognitoCredentials',
    value: function initCognitoCredentials() {
      var _this3 = this;

      return new _promise2.default(function (resolve, reject) {
        var curUrl = window.location.href;
        if (curUrl.indexOf('loggedin') >= 0) {
          if ((0, _loginutil.completeLogin)(_this3.generateConfigObj())) {
            console.debug('completeLogin successful');
          }
        } else if (curUrl.indexOf('loggedout') >= 0) {
          if ((0, _loginutil.completeLogout)(_this3.generateConfigObj())) {
            console.debug('completeLogout successful');
          }
        }
        var cognitoPoolId = _this3.config.cognito.poolId;

        var region = _this3.config.cognito.region || _this3.config.region || 'us-east-1';
        var poolName = 'cognito-idp.us-east-1.amazonaws.com/' + _this3.config.cognito.appUserPoolName;
        if (!cognitoPoolId) {
          return reject(new Error('missing cognito poolId config'));
        }

        if (!('AWS' in window) || !('CognitoIdentityCredentials' in window.AWS)) {
          return reject(new Error('unable to find AWS SDK global object'));
        }

        var credentials = void 0;
        var idtoken = localStorage.getItem('idtokenjwt');
        if (idtoken) {
          // auth role since logged in
          try {
            var logins = {};
            logins[poolName] = idtoken;
            credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: cognitoPoolId }, { region: region });
          } catch (err) {
            reject(new Error('cognito auth credentials could not be created ' + err));
          }
        } else {
          // noauth role
          try {
            credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: cognitoPoolId }, { region: region });
          } catch (err) {
            reject(new Error('cognito noauth credentials could not be created ' + err));
          }
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
            var auth = (0, _loginutil.getAuth)(_this6.generateConfigObj());
            var session = auth.getSignInUserSession();
            if (session.isValid()) {
              var tokens = {};
              tokens.idtokenjwt = localStorage.getItem('idtokenjwt');
              tokens.accesstokenjwt = localStorage.getItem('accesstokenjwt');
              tokens.refreshtoken = localStorage.getItem('refreshtoken');
              _this6.sendMessageToIframe({
                event: 'confirmLogin',
                data: tokens
              });
            }
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


        // sent when login is requested from iframe
        requestLogin: function requestLogin(evt) {
          evt.ports[0].postMessage({ event: 'resolve', type: evt.data.event });
          (0, _loginutil.login)(this.generateConfigObj());
        },


        // sent when logout is requested from iframe
        requestLogout: function requestLogout(evt) {
          (0, _loginutil.logout)(this.generateConfigObj());
          evt.ports[0].postMessage({ event: 'resolve', type: evt.data.event });
          this.sendMessageToIframe({ event: 'confirmLogout' });
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
        if (this.containerElement.classList.contains(this.containerClass + '--minimize')) {
          localStorage.setItem('lastUiIsMinimized', 'true');
        } else {
          localStorage.setItem('lastUiIsMinimized', 'false');
        }
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
        // check for last state and resume with this configuration
        if (localStorage.getItem('lastUiIsMinimized') && localStorage.getItem('lastUiIsMinimized') === 'true') {
          _this9.api.toggleMinimizeUi();
        } else if (localStorage.getItem('lastUiIsMinimized') && localStorage.getItem('lastUiIsMinimized') === 'false') {
          _this9.api.ping();
        } else if (_this9.config.iframe.shouldLoadIframeMinimized) {
          _this9.api.toggleMinimizeUi();
        }
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
      if (!('shouldLoadIframeMinimized' in iframeConfig)) {
        console.error('missing shouldLoadIframeMinimized config field');
        return false;
      }

      return true;
    }
  }]);
  return IframeComponentLoader;
}();

exports.default = IframeComponentLoader;

/***/ }),

/***/ "./lib/loginutil.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAuth = exports.completeLogout = exports.completeLogin = exports.login = exports.logout = undefined;

var _stringify = __webpack_require__("../../../node_modules/babel-runtime/core-js/json/stringify.js");

var _stringify2 = _interopRequireDefault(_stringify);

var _amazonCognitoAuthJs = __webpack_require__("../../../node_modules/amazon-cognito-auth-js/es/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAuth(config) {
  var rd1 = window.location.protocol + '//' + window.location.hostname + window.location.pathname + '?loggedin=yes';
  var rd2 = window.location.protocol + '//' + window.location.hostname + window.location.pathname + '?loggedout=yes';
  var authData = {
    ClientId: config.appUserPoolClientId, // Your client id here
    AppWebDomain: config.appDomainName,
    TokenScopesArray: ['email', 'openid', 'profile'],
    RedirectUriSignIn: rd1,
    RedirectUriSignOut: rd2
  };

  if (config.appUserPoolIdentityProvider && config.appUserPoolIdentityProvider.length > 0) {
    authData.IdentityProvider = config.appUserPoolIdentityProvider;
  }

  var auth = new _amazonCognitoAuthJs.CognitoAuth(authData);
  auth.useCodeGrantFlow();
  auth.userhandler = {
    onSuccess: function onSuccess(session) {
      console.debug('Sign in success');
      localStorage.setItem('idtokenjwt', session.getIdToken().getJwtToken());
      localStorage.setItem('accesstokenjwt', session.getAccessToken().getJwtToken());
      localStorage.setItem('refreshtoken', session.getRefreshToken().getToken());
    },
    onFailure: function onFailure(err) {
      console.debug('Sign in failure: ' + (0, _stringify2.default)(err, null, 2));
    }
  };
  return auth;
} /*
  Copyright 2017-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
  
  Licensed under the Amazon Software License (the "License"). You may not use this file
  except in compliance with the License. A copy of the License is located at
  
  http://aws.amazon.com/asl/
  
  or in the "license" file accompanying this file. This file is distributed on an "AS IS"
  BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
  License for the specific language governing permissions and limitations under the License.
  */

/* eslint-disable prefer-template, no-console */

function completeLogin(config) {
  var auth = getAuth(config);
  var curUrl = window.location.href;
  var values = curUrl.split('?');
  var minurl = '/' + values[1];
  try {
    auth.parseCognitoWebResponse(curUrl);
    return true;
  } catch (reason) {
    console.debug('failed to parse response: ' + reason);
    console.debug('url was: ' + minurl);
    return false;
  }
}

function completeLogout() {
  localStorage.removeItem('idtokenjwt');
  localStorage.removeItem('accesstokenjwt');
  localStorage.removeItem('refreshtoken');
  localStorage.removeItem('cognitoid');
  console.debug('logout complete');
  return true;
}

function logout(config) {
  /* eslint-disable prefer-template, object-shorthand, prefer-arrow-callback */
  var auth = getAuth(config);
  auth.signOut();
}

function login(config) {
  /* eslint-disable prefer-template, object-shorthand, prefer-arrow-callback */
  var auth = getAuth(config);
  var session = auth.getSignInUserSession();
  if (!session.isValid()) {
    auth.getSession();
  }
}

exports.logout = logout;
exports.login = login;
exports.completeLogin = completeLogin;
exports.completeLogout = completeLogout;
exports.getAuth = getAuth;

/***/ })

/******/ })["ChatBotUiLoader"];
});
//# sourceMappingURL=lex-web-ui-loader.js.map