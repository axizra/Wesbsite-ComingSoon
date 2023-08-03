(function(w, d) {
    zaraz.debug = (es = "") => {
        document.cookie = `zarazDebug=${es}; path=/`;
        location.reload()
    };
    window.zaraz._al = function(bq, br, bs) {
        w.zaraz.listeners.push({
            item: bq,
            type: br,
            callback: bs
        });
        bq.addEventListener(br, bs)
    };
    zaraz.preview = (ch = "") => {
        document.cookie = `zarazPreview=${ch}; path=/`;
        location.reload()
    };
    zaraz.i = function(ef) {
        const eg = d.createElement("div");
        eg.innerHTML = unescape(ef);
        const eh = eg.querySelectorAll("script");
        for (let ei = 0; ei < eh.length; ei++) {
            const ej = d.createElement("script");
            eh[ei].innerHTML && (ej.innerHTML = eh[ei].innerHTML);
            for (const ek of eh[ei].attributes) ej.setAttribute(ek.name, ek.value);
            d.head.appendChild(ej);
            eh[ei].remove()
        }
        d.body.appendChild(eg)
    };
    zaraz.f = async function(ep, eq) {
        const er = {
            credentials: "include",
            keepalive: !0,
            mode: "no-cors"
        };
        if (eq) {
            er.method = "POST";
            er.body = new URLSearchParams(eq);
            er.headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        return await fetch(ep, er)
    };
    ! function(ci, cj, ck, cl, cm, cn) {
        function co(cq, cr) {
            cn ? cl(cq, cr || 32) : cm.push(cq, cr)
        }

        function cp(cs, ct, cu, cv) {
            return ct && cj.getElementById(ct) || (cv = cj.createElement(cs || "SCRIPT"), ct && (cv.id = ct), cu && (cv.onload = cu), cj.head.appendChild(cv)), cv || {}
        }
        cn = /p/.test(cj.readyState), ci.addEventListener("on" + ck in ci ? ck : "load", (function() {
            for (cn = 1; cm[0];) co(cm.shift(), cm.shift())
        })), co._ = cp, ci.defer = co, ci.deferscript = function(cw, cx, cy, cz) {
            co((function() {
                cp("", cx, cz).src = cw
            }), cy)
        }
    }(this, d, "pageshow", setTimeout, []);
    defer((function() {
        for (; zaraz.deferred.length;) zaraz.deferred.pop()();
        Object.defineProperty(zaraz.deferred, "push", {
            configurable: !0,
            enumerable: !1,
            writable: !0,
            value: function(...cA) {
                let cB = Array.prototype.push.apply(this, cA);
                for (; zaraz.deferred.length;) zaraz.deferred.pop()();
                return cB
            }
        })
    }), 5500);
    addEventListener("visibilitychange", (function() {
        for (; zaraz.deferred.length;) zaraz.deferred.pop()()
    }));
    window.zaraz._p = async et => new Promise((eu => {
        if (et) {
            et.e && et.e.forEach((ev => {
                try {
                    new Function(ev)()
                } catch (ew) {
                    console.error(`Error executing script: ${ev}\n`, ew)
                }
            }));
            Promise.allSettled((et.f || []).map((ex => fetch(ex[0], ex[1]))))
        }
        eu()
    }));
    zaraz.pageVariables = {};
    zaraz.__zcl = zaraz.__zcl || {};
    zaraz.track = async function(L, M, N) {
        return new Promise(((O, P) => {
            const Q = {
                name: L,
                data: {}
            };
            for (const R of [localStorage, sessionStorage]) Object.keys(R || {}).filter((T => T.startsWith("_zaraz_"))).forEach((S => {
                try {
                    Q.data[S.slice(7)] = JSON.parse(R.getItem(S))
                } catch {
                    Q.data[S.slice(7)] = R.getItem(S)
                }
            }));
            Object.keys(zaraz.pageVariables).forEach((U => Q.data[U] = JSON.parse(zaraz.pageVariables[U])));
            Object.keys(zaraz.__zcl).forEach((V => Q.data[`__zcl_${V}`] = zaraz.__zcl[V]));
            Q.data.__zarazMCListeners = zaraz.__zarazMCListeners;
            //
            Q.data = { ...Q.data,
                ...M
            };
            Q.zarazData = zarazData;
            fetch("/cdn-cgi/zaraz/t", {
                credentials: "include",
                keepalive: !0,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Q)
            }).catch((() => {
                //
                return fetch("/cdn-cgi/zaraz/t", {
                    credentials: "include",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(Q)
                })
            })).then((function(X) {
                zarazData._let = (new Date).getTime();
                X.ok || P();
                return 204 !== X.status && X.json()
            })).then((async W => {
                await zaraz._p(W);
                "function" == typeof N && N()
            })).finally((() => O()))
        }))
    };
    zaraz.set = function(Y, Z, $) {
        try {
            Z = JSON.stringify(Z)
        } catch (ba) {
            return
        }
        prefixedKey = "_zaraz_" + Y;
        sessionStorage && sessionStorage.removeItem(prefixedKey);
        localStorage && localStorage.removeItem(prefixedKey);
        delete zaraz.pageVariables[Y];
        if (void 0 !== Z) {
            $ && "session" == $.scope ? sessionStorage && sessionStorage.setItem(prefixedKey, Z) : $ && "page" == $.scope ? zaraz.pageVariables[Y] = Z : localStorage && localStorage.setItem(prefixedKey, Z);
            zaraz.__watchVar = {
                key: Y,
                value: Z
            }
        }
    };
    for (const {
            m: bb,
            a: bc
        } of zarazData.q.filter((({
            m: bd
        }) => ["debug", "set"].includes(bd)))) zaraz[bb](...bc);
    for (const {
            m: be,
            a: bf
        } of zaraz.q) zaraz[be](...bf);
    delete zaraz.q;
    delete zarazData.q;
    zaraz.fulfilTrigger = function(el, em, en, eo) {
        zaraz.__zarazTriggerMap || (zaraz.__zarazTriggerMap = {});
        zaraz.__zarazTriggerMap[el] || (zaraz.__zarazTriggerMap[el] = "");
        zaraz.__zarazTriggerMap[el] += "*" + em + "*";
        zaraz.track("__zarazEmpty", { ...en,
            __zarazClientTriggers: zaraz.__zarazTriggerMap[el]
        }, eo)
    };
    window.dataLayer = w.dataLayer || [];
    zaraz._processDataLayer = bj => {
        for (const bk of Object.entries(bj)) zaraz.set(bk[0], bk[1], {
            scope: "page"
        });
        if (bj.event) {
            if (zarazData.dataLayerIgnore && zarazData.dataLayerIgnore.includes(bj.event)) return;
            let bl = {};
            for (let bm of dataLayer.slice(0, dataLayer.indexOf(bj) + 1)) bl = { ...bl,
                ...bm
            };
            delete bl.event;
            bj.event.startsWith("gtm.") || zaraz.track(bj.event, bl)
        }
    };
    const bi = w.dataLayer.push;
    Object.defineProperty(w.dataLayer, "push", {
        configurable: !0,
        enumerable: !1,
        writable: !0,
        value: function(...bn) {
            let bo = bi.apply(this, bn);
            zaraz._processDataLayer(bn[0]);
            return bo
        }
    });
    dataLayer.forEach((bp => zaraz._processDataLayer(bp)));
    zaraz._cts = () => {
        zaraz._timeouts && zaraz._timeouts.forEach((j => clearTimeout(j)));
        zaraz._timeouts = []
    };
    zaraz._rl = function() {
        w.zaraz.listeners && w.zaraz.listeners.forEach((k => k.item.removeEventListener(k.type, k.callback)));
        window.zaraz.listeners = []
    };
    history.pushState = function() {
        try {
            zaraz._rl();
            zaraz._cts && zaraz._cts()
        } finally {
            History.prototype.pushState.apply(history, arguments);
            setTimeout((() => {
                zarazData.l = d.location.href;
                zarazData.t = d.title;
                zaraz.pageVariables = {};
                zaraz.__zarazMCListeners = {};
                zaraz.track("__zarazSPA")
            }), 100)
        }
    };
    history.replaceState = function() {
        try {
            zaraz._rl();
            zaraz._cts && zaraz._cts()
        } finally {
            History.prototype.replaceState.apply(history, arguments);
            setTimeout((() => {
                zarazData.l = d.location.href;
                zarazData.t = d.title;
                zaraz.pageVariables = {};
                zaraz.track("__zarazSPA")
            }), 100)
        }
    };
    zaraz._c = fF => {
        const {
            event: fG,
            ...fH
        } = fF;
        zaraz.track(fG, { ...fH,
            __zarazClientEvent: !0
        })
    };
    zaraz._syncedAttributes = ["altKey", "clientX", "clientY", "pageX", "pageY", "button"];
    zaraz.__zcl.track = !0;
    d.addEventListener("visibilitychange", (fN => {
        zaraz._c({
            event: "visibilityChange",
            visibilityChange: [{
                state: d.visibilityState,
                timestamp: (new Date).getTime()
            }]
        }, 1)
    }));
    zaraz.__zcl.visibilityChange = !0;
    zaraz.__zarazMCListeners = {
        "google-analytics_v4_20ac": ["visibilityChange"]
    };
    zaraz._p({
        "e": ["(function(w,d){w.zarazData.executed.push(\"Pageview\");})(window,document)"],
        "f": [
            ["https://stats.g.doubleclick.net/g/collect?t=dc&aip=1&_r=3&v=1&_v=j86&tid=G-SEKJ4E9T4H&cid=f7b65a38-4589-406d-9c8a-e17b301602f7&_u=KGDAAEADQAAAAC%7E&z=563707809", {}]
        ]
    })
})(window, document);