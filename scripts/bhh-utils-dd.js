function addLoadEvent(func) {
  let oldLoad = window.onload;
  if (typeof oldLoad !== "function") {
    window.onload = func;
  } else {
    window.onload = function() {
      oldLoad();
      func();
    }
  }
}

// 事件通用函数
const EventUtil = {
  addHandler: function(elem, type, handler) {
    if (elem.addEventListener) {
      elem.addEventListener(type, handler, false);
    } else if (elem.attatchEvent) {
      elem.attatchEvent("on"+type, handler);
    } else {
      elem["on"+type] = handler;
    }
  },
  removeHandler: function (elem, type, handler) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handler, false);
    } else if (elem.detachEvent) {
      elem.detachEvent("on"+type, handler);
    } else {
      elem["on"+type] = null;
    }
  },
  getEvent: function(event) {
    return event? event : window.event;
  },
  getTarget: function(event) {
    return event.target || event.srcElement;
  },
  preventDefault: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
  stopPropagation: function(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  }
}

// 添加类名, 参数：元素elem，新类名newClass，新类名之前保留几个类名num；
function addClass(elem, newClass, num) {
  let oldClass = elem.className;
  if (!oldClass) {
    elem.className = newClass;
  } else if (!num || typeof num !== "number") {
    elem.className = oldClass + " " +newClass;
  } else {
    let arr = oldClass.split(/\s+/, num);
    elem.className = arr.join(" ") + " " + newClass;
  }
}

// 参数（元素个数，当前索引），返回下一个索引
function nextIndex(length, curIndex) {
  if (curIndex < length-1) {
    return curIndex + 1;
  } else {
    return 0;
  }
}
// 参数（元素个数，当前索引），返回上一个索引
function preIndex(length, curIndex) {
  if (curIndex > 0) {
    return curIndex - 1;
  } else {
    return length - 1;
  }
}