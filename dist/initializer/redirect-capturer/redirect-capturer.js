export default function (guardian) {
    var pathname = location.pathname;
    if (pathname !== '/') {
        guardian.redirectUrl = pathname;
    }
};
//# sourceMappingURL=redirect-capturer.js.map