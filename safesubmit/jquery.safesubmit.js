/**
 * jquery.safesubmit - Disable form buttons to avoid double-clicking
 * @date 23 July 2010
 * @author Jake Trent  http://www.builtbyjake.com
 * @version 1.1
 */
(function ($) {
  $.fn.safesubmit = function (settings) {

    var opts = $.extend({}, $.fn.safesubmit.defaults, settings);

    this.each(function () {
      $(this).data('opts', opts).click($.fn.safesubmit.safe).ajaxComplete($.fn.safesubmit.unsafe);
    });

    return this;
  };

  $.fn.safesubmit.safe = function (event, elem) {
    var opts = $(this).data('opts');
    elem = elem || $(this);
    if (elem.data('safesubmit') != 'fail') {
      elem.addClass(opts.disabled_class)
          .attr(opts.disabled_attr, opts.disabled_attr_val);
    }
    elem.removeData('safesubmit');
  };

  $.fn.safesubmit.unsafe = function (event) {
    var opts = $(this).data('opts');
    $(event.target).removeClass(opts.disabled_class).removeAttr(opts.disabled_attr);
  };

  $.fn.safesubmit.failsubmit = function (elem) {
    elem.data('safesubmit', 'fail');
  };

  $.fn.safesubmit.defaults = {
    disabled_class: "disabled",
    disabled_attr: "disabled",
    disabled_attr_val: "disabled"
  };

})(jQuery);

