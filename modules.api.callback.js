modules = {
	list:{},
	use: function(name, callback){

			var include = function(src, cb, nochache){
			  var i=0, include_one;
			  var hasStylesheet = function(filename){
				var styleSheets = document.styleSheets;
				for (var i=0; i < styleSheets.length; i++){
				  if(styleSheets[i].href.indexOf(filename)!=-1){return true;}
				}
				return false;
			  }

			  var hasScript = function(filename){
				var scripts = document.scripts;
				for (var i=0; i < scripts.length; i++){
				  if(scripts[i].src.indexOf(filename)!=-1){return true;}
				}
				return false;
			  }

			  var includeOne = function(filename, cb, nochache){
				var a, ext;
				a = filename.split('.');
				ext = a[a.length-1];
				if(ext==='js'){
				  if(!hasScript(filename)){
					console.info('included  js', filename);
					document.body.appendChild(crEl('script',{
					  async: false,
					  type:'text/javascript',
					  src:filename + (nochache?'?id=' + Math.random().toFixed(3):''),
					  events:{
						load: cb,
						error: function(event){
						  event.preventDefault();
						  console.log('Error include js ', filename, arguments);
						  return false;
						}
					  }
					}));
				  } else {
					console.info('js file', filename, ' already exists');
					if( typeof cb === 'function' ) { cb.call(); }
				  }
				} else if(ext==='css'){
				  if(!hasStylesheet(filename)){
					document.getElementsByTagName('head')[0].appendChild(crEl('link',{
					  rel:'stylesheet',
					  href:filename+ (nochache?'?id=' + Math.random().toFixed(3):''),
					  type:'text/css',
					  events:{
						load:cb,
						error:function(event){
						  console.log('Error include css ', filename, arguments);
						  return false;
						}
					  }
					}));
					console.info('included css', filename)
				  } else {
					console.info('css file', filename, ' already exists');
					if( typeof cb === 'function' ) { cb.call(); }
				  }


				} else {
					console.log("Undefined type of file", filename);
				}

			  }

			  if(typeof src === 'string'){
				includeOne( src, cb, nochache );
			  } else if(typeof src === 'object'){


				var	recuInclude =  function (arr, i, cb, nochache){
				  if(arr[i] && arr[i].length){
					includeOne(
						arr[i],
						(arr[i+1] && arr[i+1].length)?function(){ recuInclude(arr, i+1, cb, nochache); }:function(){ if(typeof cb === 'function'){ cb(); } },
						nochache
					);
				  } else {
					if(typeof cb === 'function'){ cb(); }
				  }
				};
				recuInclude(src, 0, cb, nochache);
			  }

			}

			var functionExist = function(s){
				var f = s.split('.');
				var buf = window;
				for(i=0; i<f.length; i++){
					if(typeof(buf[f[i]])==='undefined'){return void(0);}
					buf = buf[f[i]];
				}
				return buf;
			}
		
			// если в качестве имени передан массив (Несколько модулей)
			if(typeof(name) === 'object' && name.length>0){
				var recuUse = function (names, i, _cb) {
					console.log('i',i)
					if(names[i]){
						modules.use(names[i],function(){
							if(names[i+1]){
								console.log('next',names[i+1])
								recuUse(names, i+1,_cb);
							}else{
								_cb();
							}
						})
						
					}
					
				}
				recuUse(name, 0, function(){
					if(typeof(callback)==='function'){callback();}
				})
			};

			//Зависимости если есть
			var loadDependencies = function (dependArr, cbld){
				if(!dependArr || dependArr.length===0){cbld(); return false;}
				var loadOneDep =  function(depss, index, _cb){
					if(!depss){_cb()}
					modules.use(depss[index], function(){
						if(depss[index+1]){
							console.log("Next Dep", depss[index+1])
							loadOneDep(depss, index+1, _cb);
						} else {
							_cb();
						}
					})
				}
				loadOneDep(dependArr, 0, cbld);
			}

			if( typeof modules.list[name] === 'undefined' ){ console.log("Module -s is not defined", name); return false;}
			if( typeof modules.list[name].beforeLoad === 'function' ){ modules.list[name].beforeLoad(func); }

			var func = functionExist(modules.list[name].func) ;

			if(  typeof func != 'undefined' ){
				if( typeof callback === 'function' ){ callback(func); }
			}

			if( modules.list[name].folder && modules.list[name].folder.length  ) {
				console.log("Module in folder", modules.list[name].folder);
				for(i=0; i<modules.list[name].files.length; i++){
					modules.list[name].files[i] = modules.list[name].folder + modules.list[name].files[i];
				}
				modules.list[name].folder = null;
			}


			loadDependencies(modules.list[name].depend || [], function(){
				console.time('LoadModule_'+name);

				include(modules.list[name].files, function(){
					console.timeEnd('LoadModule_'+name);
					var func = functionExist(modules.list[name].func) ;
					if(typeof modules.list[name].afterLoad === 'function'){ modules.list[name].afterLoad();}
					if( typeof callback === 'function' ){ callback(func); }
				})
			});

		
	},

	showDocs: function(name){
		if( typeof modules.list[name] === 'undefined' ){ console.log("Module -s is not defined", name); return false;}
		if( typeof modules.list[name].docs != 'undefined'  && modules.list[name].docs.length){
			console.log('url',modules.list[name].docs)
			var win = window.open(modules.list[name].docs, '_blank');
				win.focus();

		}
	},
	define: function(name, params){
			if( typeof modules.list[name] != 'undefined' ){ console.log("Module already exists", name); return false;}
			modules.list[name] = params;
	}
}
