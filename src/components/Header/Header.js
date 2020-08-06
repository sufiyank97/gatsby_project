import { Link } from "gatsby"
import React, { useEffect } from "react"
import jQuery from 'jquery'

const Header = ({ image, value }) => {
  useEffect(
    () => {

      if (typeof window !== `undefined`) {

        jQuery(function () {
          initMobileNav();
        });
        // mobile menu init
        function initMobileNav() {
          jQuery('body').mobileNav({
            menuActiveClass: 'nav-active',
            menuOpener: '.nav-opener',
            hideOnClickOutside: true,
            menuDrop: '.nav-drop'
          });

        }
        /*
         * Simple Mobile Navigation
         */
        ; (function ($) {
          function MobileNav(options) {
            this.options = $.extend({
              container: null,
              hideOnClickOutside: false,
              menuActiveClass: 'nav-active',
              menuOpener: '.nav-opener',
              menuDrop: '.nav-drop',
              toggleEvent: 'click',
              outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
            }, options);
            this.initStructure();
            this.attachEvents();
          }
          MobileNav.prototype = {
            initStructure: function () {
              this.page = $('html');
              this.container = $(this.options.container);
              this.opener = this.container.find(this.options.menuOpener);
              this.drop = this.container.find(this.options.menuDrop);

            },
            attachEvents: function () {
              var self = this;

              if (activateResizeHandler) {
                activateResizeHandler();
                activateResizeHandler = null;
              }

              this.outsideClickHandler = function (e) {
                if (self.isOpened()) {
                  var target = $(e.target);

                  if (!target.closest(self.opener).length && !target.closest(self.drop).length) {
                    self.hide();
                  }
                }
              };
              this.openerClickHandler = function (e) {
                e.preventDefault();
                self.toggle();

              };
              this.opener.click(this.options.toggleEvent, this.openerClickHandler);

            },
            isOpened: function () {
              return this.container.hasClass(this.options.menuActiveClass);
            },
            show: function () {

              this.container.addClass(this.options.menuActiveClass);
              if (this.options.hideOnClickOutside) {
                this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
              }
            },
            hide: function () {
              this.container.removeClass(this.options.menuActiveClass);
              if (this.options.hideOnClickOutside) {
                this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
              }
            },
            toggle: function () {
              if (this.isOpened()) {
                this.hide();
              } else {
                this.show();
              }
            },
            destroy: function () {

              this.container.removeClass(this.options.menuActiveClass);
              this.opener.off(this.options.toggleEvent, this.clickHandler);
              this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);

            }
          };

          var activateResizeHandler = function () {
            var win = $(window),
              doc = $('html'),
              resizeClass = 'resize-active',
              flag, timer;
            var removeClassHandler = function () {
              flag = false;
              doc.removeClass(resizeClass);
            };
            var resizeHandler = function () {
              if (!flag) {
                flag = true;
                doc.addClass(resizeClass);
              }
              clearTimeout(timer);
              timer = setTimeout(removeClassHandler, 500);
            };
            win.click('resize orientationchange', resizeHandler);
          };

          $.fn.mobileNav = function (opt) {

            var args = Array.prototype.slice.call(arguments);
            var method = args[0];

            return this.each(function () {
              var $container = jQuery(this);
              var instance = $container.data('MobileNav');

              if (typeof opt === 'object' || typeof opt === 'undefined') {
                $container.data('MobileNav', new MobileNav($.extend({
                  container: this
                }, opt)));
              } else if (typeof method === 'string' && instance) {
                if (typeof instance[method] === 'function') {
                  args.shift();
                  instance[method].apply(instance, args);
                }
              }
            });
          };
        }(jQuery));
      }
    }, [])

  return (

    <header className="header">
      <div className="container1">
        {/* LOGO */}
        <strong className="logo">
          <Link to="/"><img src={image} alt="MATCHDATE" /></Link>
        </strong>
        {/* END LOGO */}
        {
          (value) ? (
            <>
              <style dangerouslySetInnerHTML={{
                __html: [
                  '.top-container .nav-opener:before {',
                  '  background: deeppink !important;',
                  '}',
                  '.top-container .nav-opener:after {',
                  '  background: deeppink !important;',
                  '}'
                ].join('\n')
              }}>
              </style>
              <a className="nav-opener" style={{ borderTopColor: 'deeppink', }}></a>
            </>
          ) :
            (
              <>
                <a className="nav-opener" ></a>
              </>
            )
        }

        <div className="nav-drop">
          <ul className="navbar-nav menu">
            <li className="nav-item" style={{ margin: '0px' }}><Link to="/about" className="nav-link" style={(value) ? { color: 'deeppink' } : null}>About Us</Link></li>
            <li className="nav-item" style={{ margin: '0px' }}><Link to="/events" className="nav-link" style={(value) ? { color: 'deeppink' } : null}>Events</Link></li>
            <li className="nav-item" style={{ margin: '0px' }}><Link to="/event-host" className="nav-link" style={(value) ? { color: 'deeppink' } : null}>Event Hosts</Link></li>
            <li className="nav-item" style={{ margin: '0px' }}><Link to="/faq" className="nav-link" style={(value) ? { color: 'deeppink' } : null}>FAQ</Link></li>
            {/* <li><Link to="/testimonial">Testimonials</Link></li> */}
            {/* <li><a href="#">Registration and Events</a></li> */}
          </ul>
        </div>
      </div>
    </header >
  )
}


export default Header
