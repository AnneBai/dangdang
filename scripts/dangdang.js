addLoadEvent(initTop);
function initTop() {
  pickWord("area", "areaList");
  pickWord("category", "sortList");
}
// 悬浮下拉list，点击选择后隐藏，选择文本显示在target；参数（targetId, listId）
function pickWord(targetId, listId) {
  const doc = document,
        targetElem = doc.getElementById(targetId),
        listElem = doc.getElementById(listId),
        listParent = listElem.parentNode;
  EventUtil.addHandler(listParent, "mouseover", function(){
    addClass(listParent,"hover", 1);
  });
  EventUtil.addHandler(listParent, "mouseout", function(){
    addClass(listParent,"", 1);
  });
  EventUtil.addHandler(listElem, "click", function(event) {
    event = EventUtil.getEvent(event);
    let target = EventUtil.getTarget(event);
    if (target.tagName === "A") {
      let txt = target.innerHTML;
      targetElem.innerHTML = txt;
      addClass(listParent, "", 1);
    }
  });  
}

addLoadEvent(initBigImages);
function initBigImages() {
  // 大图片轮播
  const doc = document,
        imgBox = doc.getElementById("bigImages"),
        imgs = imgBox.getElementsByClassName("b-img"),
        imgBtnBox = doc.getElementById("bigImages-btn"),
        btns = imgBtnBox.getElementsByTagName("a");
  let len = imgBtnBox.getElementsByTagName("a").length;
  EventUtil.addHandler(imgBox, "click", function(event) {
    event = EventUtil.getEvent(event);
    let target = EventUtil.getTarget(event),
        currentIndex = +imgBox.className.slice(-1);
    switch(target.id) {
      case "b-leftArrow":
        let leftIndex = preIndex(len, currentIndex);
        updateImages(imgBox, imgs, btns, len, leftIndex);
        break;
      case "b-rightArrow":
        let rightIndex = nextIndex(len, currentIndex);
        updateImages(imgBox, imgs, btns, len, rightIndex);
        break;
    }
  });
  EventUtil.addHandler(imgBtnBox, "click", function(event) {
    event = EventUtil.getEvent(event);
    let target = EventUtil.getTarget(event);
    if (target.tagName === "A") {
      let btnIndex = +target.innerHTML-1;
      updateImages(imgBox, imgs, btns, len, btnIndex);
    }
  });
  updateImages(imgBox, imgs, btns, len, 0);
}
// 更新图片，定时切换
function updateImages(imgBoxElem, imgElems, btnElems, length, index) {
  if (imgBoxElem.move) {
    clearTimeout(imgBoxElem.move);
  }
  imgBoxElem.className = "img"+index;
  for (let i=0; i < length; i++) {
    let img = imgElems[i],
        btn = btnElems[i];
    if (i === index) {
      addClass(img, "cur", 1);
      addClass(btn, "btn-cur", 0);
    } else {
      addClass(img, "hide", 1);
      btn.className = "";
    }
  }
  let autoIndex = nextIndex(length, index);
  let repeat = function() {
    updateImages(imgBoxElem, imgElems, btnElems, length, autoIndex);
  }
  imgBoxElem.move = setTimeout(repeat, 3000);
}

addLoadEvent(initSmallImages);
function initSmallImages() {
  // 小图片轮播
  
}



addLoadEvent(initRightSider);
function initRightSider() {
  // 右侧栏事件
  const doc = document,
        tagBox = doc.getElementById("right-tag"),
        tags = tagBox.getElementsByTagName("span"),
        detailBox = doc.getElementById("right-tag-detail"),
        details = detailBox.getElementsByTagName("ul");
  EventUtil.addHandler(tagBox, "mouseover", function(event) {
    event = EventUtil.getEvent(event);
    let target = EventUtil.getTarget(event);
    switch(target.id) {
      case "tag-1":
        updateTag(tagBox, tags, details, 0);
        break;
      case "tag-2":
        updateTag(tagBox, tags, details, 1);
        break;
    }
  });
  updateTag(tagBox, tags, details, 0); 
}
function updateTag(tagBoxElem, tagElems, detailElems, index) {
  if (tagBoxElem.move) {
    clearTimeout(tagBoxElem.move);
  }
  tagBoxElem.className = "tag"+index;
  let len = tagElems.length;
  for (let i=0; i < len; i++) {
    let tag = tagElems[i],
        detail = detailElems[i];
    if (i === index) {
      tag.className = "tag-cur";
      detail.className = "detail-cur";
    } else {
      tag.className = "";
      detail.className = "detail-hide";
    } 
  }
  let autoIndex = nextIndex(len, index);
  let repeat = function() {
    updateTag(tagBoxElem, tagElems, detailElems, autoIndex);
  }
  tagBoxElem.move = setTimeout(repeat, 4000);
}

addLoadEvent(initRightImages);
function initRightImages() {
  const doc = document,
        imgBox = doc.getElementById("right-lbImages"),
        imgLinks = imgBox.getElementsByClassName("r-img");
  let curIndex = 1;
  autoChange(imgLinks, curIndex);
}
function autoChange(elements, index) {
  const start = -202,
        end = 202,
        unitWidth = 202,
        len = elements.length;
  let autoIndex = nextIndex(len, index);
  slideImages(elements, start, end, unitWidth, index, autoIndex);
  let repeat = function() {
    autoChange(elements, autoIndex);
  }
  elements[1].move = setTimeout(repeat, 4000);
}

// 右下侧小图片轮播
// 参数（nodeList, 第一个left（数值）， 最后一个left（数值），图片宽度数值(px)， 目标索引）
function slideImages(elems, startLeft, endLeft, width, fromIndex, toIndex) {
  let len = elems.length,
      dist = (toIndex-fromIndex)*width;
  
  for (let i=0; i < len; i++) {
    let elem = elems[i],
        x_pos = parseInt(elem.style.left, 10),
        s = x_pos - dist;
    elem.style.left = s + "px";
  }
}