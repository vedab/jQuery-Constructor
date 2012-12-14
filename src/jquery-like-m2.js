/**
* @Author Veda Balan
* @Description Below is an example mechanism to mimic jQuery function. Method 2. 
*    This method mimics the jQuery constructor much closer than Method 1.
* 
*/

var $2 = jQ = (function(){

	var jQ = function(selector,ctx){
		return new jQ.fn.init(selector, ctx);
	};
	
	jQ.fn = jQ.prototype = {
		constructor: jQ
		,ready: function(fn){
			//this fn will need to be added to a queue and gets fired when document is ready
			fn.call(this);
			return this;
		}
		,init:function(s,ctx){
			this.selector = s;

			//the below if-else is better implemented in jQuery using Sizzle.js
			if(!s) {
				this.ctx = ctx;
				this.selector = null;
			} else if(s.nodeType) {
				this.ctx = s;
			} else if(s.indexOf("#") === 0) {
				this.ctx = (ctx || document).getElementById(s.substr(1));
			} else if(s.indexOf(".") === 0) {
				this.ctx = (ctx || document).getElementsByClassName(s.substr(1));
			} else if(s.indexOf("<") === 0) {
				this.ctx = (ctx || document).createElement(s.substr(1, s.indexOf(" ") -1));
			} else {
				this.ctx = (ctx || document).getElementsByTagName(s);
			}
			this.length = (this.ctx)? (this.ctx.length? this.ctx.length : 1) : 0;
			return this;
		}
		,html: function(_html){
			if(_html){
				return this.each(function(index, ctx){
					ctx.innerHTML = _html;
				});
			}
			return this.get(0).ctx.innerHTML;
		}
		,val: function(v){
			if(arguments.length == 0)
				return this.ctx.value;//if this.ctx is select then get the value appropriately
			this.ctx.value = v;
			return this;
		}
		,css: function(k,v){
			return this.each(function(index, ctx){
				ctx.style[k] = v;
			});
		}
		,get: function(index){
			if(this.ctx.length)
				if(this.ctx.length-1 >= index)
					return new jQ(this.ctx[index]);
				else return new jQ(this.ctx[0]);
			return new jQ(this.ctx);
		}
		,each: function(fn){
			for(var i=0,s=this.length; i < s; ++i){
				fn.call(this, i, this.ctx[i]);
			}
			return this;
		}
	};//jQ prototype
	
	//the most important line in this implementation
	jQ.fn.init.prototype = jQ.fn;

	return jQ;
})();
