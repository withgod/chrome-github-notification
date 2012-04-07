var notify_url      = "https://github.com/inbox/notifications";
var interval        = 1000 * 60 * 3;
var unread_selector = ".unread_count";
var login_selector  = ".login_form";
var timerId;

function updateBadge() {
	if (timerId) {
		window.clearTimeout(timerId);
	}
	$.get(notify_url, function(data){
		if ($(data).find(login_selector).length == 1) {
			chrome.browserAction.setBadgeText({text : '?'});
			chrome.browserAction.setTitle({title: chrome.i18n.getMessage("msgLogin")});
		} else {
			chrome.browserAction.setTitle({title: chrome.i18n.getMessage("extName")});
			var cnt = $(data).find(unread_selector).text();
			if (cnt == "") {
				cnt = "0";
			}
			chrome.browserAction.setBadgeText({text : cnt});
		}
		timerId = window.setTimeout(updateBadge, interval);
	});
}

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.create({url: notify_url});
	chrome.browserAction.setBadgeText({text : "0"});
});

updateBadge();
