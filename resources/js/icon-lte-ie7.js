/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'cloggs-rwd\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-instagram' : '&#xe000;',
			'icon-you_tube' : '&#xe001;',
			'icon-pinterest' : '&#xe002;',
			'icon-facebook' : '&#xe003;',
			'icon-twitter' : '&#xe004;',
			'icon-expand_icon' : '&#xe005;',
			'icon-info' : '&#xe006;',
			'icon-basket' : '&#xe007;',
			'icon-search' : '&#xe009;',
			'icon-caret-left' : '&#xe00b;',
			'icon-caret-right' : '&#xe00c;',
			'icon-angle-down' : '&#xe00d;',
			'icon-small_arrow_down' : '&#xe00e;',
			'icon-small_arrow_up' : '&#xe00f;',
			'icon-small_arrow_right' : '&#xe010;',
			'icon-small_arrow_left' : '&#xe011;',
			'icon-user' : '&#xe013;',
			'icon-recent-orders' : '&#xe014;',
			'icon-store-credit' : '&#xe015;',
			'icon-edit-communication-options' : '&#xe016;',
			'icon-edit-email-password' : '&#xe017;',
			'icon-edit-billing-details' : '&#xe018;',
			'icon-address-book' : '&#xe019;',
			'icon-cloggs-helpdesk' : '&#xe01a;',
			'icon-signout' : '&#xe01b;',
			'icon-plus' : '&#xe01c;',
			'icon-minus' : '&#xe008;',
			'icon-reorder' : '&#xe012;',
			'icon-log-in' : '&#xe020;',
			'icon-close_icon' : '&#xe00a;',
			'icon-loader' : '&#xe01d;',
			'icon-close' : '&#xe01e;',
			'icon-home' : '&#xe01f;',
			'icon-delivery' : '&#xe021;',
			'icon-returns' : '&#xe022;',
			'icon-chat' : '&#xe026;',
			'icon-comments' : '&#xe027;',
			'icon-bullet-point' : '&#xe023;',
			'icon-tick' : '&#xe024;',
			'icon-tell-a-friend' : '&#xe025;',
			'icon-round-arrow-right' : '&#xe028;',
			'icon-round-arrow-left' : '&#xe029;',
			'icon-share-alt' : '&#xe02a;',
			'icon-telephone' : '&#xe02b;',
			'icon-twitter-off-canvas' : '&#xe02c;',
			'icon-facebook-off-canvas' : '&#xe02d;',
			'icon-pinterest-off-canvas' : '&#xe02e;',
			'icon-youtube-off-canvas' : '&#xe02f;',
			'icon-instagram-off-canvas' : '&#xe030;',
			'icon-thumbs-up' : '&#xe031;',
			'icon-home-nav' : '&#xe032;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};