window.onload = function() {
  var guideMasking = function(masking, target) {
    var body = document.body,
      doc = document.documentElement;
    if (masking && target) {
      // target size(width/height)
      var targetWidth = target.clientWidth,
        targetHeight = target.clientHeight;

      // page size
      var pageHeight = doc.scrollHeight,
        pageWidth = doc.scrollWidth;

      // offset of target
      var offsetTop = target.getBoundingClientRect().top + (body.scrollTop || doc.scrollTop),
        offsetLeft = target.getBoundingClientRect().left + (body.scrollLeft || doc.scrollLeft);

      // set size and border-width
      masking.style.width = targetWidth + 'px';
      masking.style.height = targetHeight + 'px';
      masking.style.borderWidth =
        offsetTop + 'px ' +
        (pageWidth - targetWidth - offsetLeft) + 'px ' +
        (pageHeight - targetHeight - offsetTop) + 'px ' +
        offsetLeft + 'px';

      masking.style.display = 'block';

      // resize
      if (!masking.isResizeBind) {
        if (window.addEventListener) {
          window.addEventListener('resize', function() {
            guideMasking(masking, target);
          });
          masking.isResizeBind = true;
        } else if (window.attachEvent) { //IE的添加事件方法
          window.attachEvent('onresize', function() {
            guideMasking(masking, target);
          });
          masking.isResizeBind = true;
        }
      }
    }
  };

  var index = 1;
  var theMasking = document.getElementById('masking');
  var targetClass = document.getElementsByClassName('showPart');
  var targetPart = document.getElementById('showPart-'+index);
  console.log('showPart-'+index);
  // var targetRank = target.getAttribute('ranking');
  guideMasking(theMasking, targetPart);

  theMasking.onclick = function() {
    index++;
    targetPart = document.getElementById('showPart-'+index);
    console.log(index);
    guideMasking(theMasking, targetPart);
    if (index>targetClass.length) {
      theMasking.style.display="none";
    }
  };

}