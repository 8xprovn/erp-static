var flowy = function (e, t, l, i, n, o, r) {
    t || (t = function () {}),
        l || (l = function () {}),
        i ||
            (i = function () {
                return !0;
            }),
        n ||
            (n = function () {
                return !1;
            }),
        o || (o = 20),
        r || (r = 80),
        Element.prototype.matches ||
            (Element.prototype.matches =
                Element.prototype.msMatchesSelector ||
                Element.prototype.webkitMatchesSelector),
        Element.prototype.closest ||
            (Element.prototype.closest = function (e) {
                var t = this;
                do {
                    if (Element.prototype.matches.call(t, e)) return t;
                    t = t.parentElement || t.parentNode;
                } while (null !== t && 1 === t.nodeType);
                return null;
            });
    var d = !1;
    function c(e, t, l) {
        return i(e, t, l);
    }
    function a(e, t) {
        return n(e, t);
    }
    (flowy.load = function () {
        if (!d) {
            d = !0;
            var i = [],
                n = [],
                s = e,
                u = 0,
                p = 0;
            ("absolute" != window.getComputedStyle(s).position &&
                "fixed" != window.getComputedStyle(s).position) ||
                ((u = s.getBoundingClientRect().left),
                (p = s.getBoundingClientRect().top));
            var g,
                w,
                f,
                h,
                y,
                C,
                v = !1,
                m = o,
                B = r,
                x = 0,
                R = !1,
                S = !1,
                b = 0,
                L = document.createElement("DIV");
            L.classList.add("indicator"),
                L.classList.add("invisible"),
                s.appendChild(L),
                (flowy.import = function (e) {  
                    s.innerHTML = e.html;
                    for (var t = 0; t < e.blockarr.length; t++)
                        i.push({
                            childwidth: parseFloat(e.blockarr[t].childwidth),
                            parent: parseFloat(e.blockarr[t].parent),
                            id: parseFloat(e.blockarr[t].id),
                            x: parseFloat(e.blockarr[t].x),
                            y: parseFloat(e.blockarr[t].y),
                            width: parseFloat(e.blockarr[t].width),
                            height: parseFloat(e.blockarr[t].height),
                        });
                    i.length > 1 && (D(), E());
                }),
                (flowy.output = function () {
                    var e = { html: s.innerHTML, blockarr: i, blocks: [] };
                    if (i.length > 0) {
                        for (var t = 0; t < i.length; t++) {
                            e.blocks.push({
                                id: i[t].id,
                                parent: i[t].parent,
                                data: [],
                                attr: [],
                            });
                            var l = document.querySelector(
                                ".blockid[value='" + i[t].id + "']"
                            ).parentNode;
                            l.querySelectorAll("input").forEach(function (l) {
                                var i = l.getAttribute("name"),
                                    n = l.value;
                                e.blocks[t].data.push({ name: i, value: n });
                            }),
                                Array.prototype.slice
                                    .call(l.attributes)
                                    .forEach(function (l) {
                                        var i = {};
                                        (i[l.name] = l.value),
                                            e.blocks[t].attr.push(i);
                                    });
                        }
                        return e;
                    }
                }),
                (flowy.deleteBlocks = function () {
                    (i = []),
                        (s.innerHTML =
                            "<div class='indicator invisible'></div>");
                }),
                (flowy.beginDrag = function (e) {
                    if (
                        (("absolute" != window.getComputedStyle(s).position &&
                            "fixed" != window.getComputedStyle(s).position) ||
                            ((u = s.getBoundingClientRect().left),
                            (p = s.getBoundingClientRect().top)),
                        e.targetTouches
                            ? ((y = e.changedTouches[0].clientX),
                              (C = e.changedTouches[0].clientY))
                            : ((y = e.clientX), (C = e.clientY)),
                        3 != e.which && e.target.closest(".create-flowy"))
                    ) {
                        h = e.target.closest(".create-flowy");
                        var l = e.target.closest(".create-flowy").cloneNode(!0);
                        e.target
                            .closest(".create-flowy")
                            .classList.add("dragnow"),
                            l.classList.add("block"),
                            l.classList.remove("create-flowy"),
                            0 === i.length
                                ? ((l.innerHTML +=
                                      "<input type='hidden' name='blockid' class='blockid' value='" +
                                      i.length +
                                      "'>"),
                                  document.body.appendChild(l),
                                  (g = document.querySelector(
                                      ".blockid[value='" + i.length + "']"
                                  ).parentNode))
                                : ((l.innerHTML +=
                                      "<input type='hidden' name='blockid' class='blockid' value='" +
                                      (Math.max.apply(
                                          Math,
                                          i.map((e) => e.id)
                                      ) +
                                          1) +
                                      "'>"),
                                  document.body.appendChild(l),
                                  (g = document.querySelector(
                                      ".blockid[value='" +
                                          (parseInt(
                                              Math.max.apply(
                                                  Math,
                                                  i.map((e) => e.id)
                                              )
                                          ) +
                                              1) +
                                          "']"
                                  ).parentNode)),
                            (n = e.target.closest(".create-flowy")),
                            t(n),
                            g.classList.add("dragging"),
                            (v = !0),
                            (w =
                                y -
                                e.target
                                    .closest(".create-flowy")
                                    .getBoundingClientRect().left),
                            (f =
                                C -
                                e.target
                                    .closest(".create-flowy")
                                    .getBoundingClientRect().top),
                            (g.style.left = y - w + "px"),
                            (g.style.top = C - f + "px");
                    }
                    var n;
                }),
                (flowy.endDrag = function (e) {
                    if (3 != e.which && (v || R))
                        if (
                            ((S = !1),
                            l(),
                            document
                                .querySelector(".indicator")
                                .classList.contains("invisible") ||
                                document
                                    .querySelector(".indicator")
                                    .classList.add("invisible"),
                            v &&
                                (h.classList.remove("dragnow"),
                                g.classList.remove("dragging")),
                            0 === parseInt(g.querySelector(".blockid").value) &&
                                R)
                        )
                            X("rearrange");
                        else if (
                            v &&
                            0 == i.length &&
                            g.getBoundingClientRect().top + window.scrollY >
                                s.getBoundingClientRect().top +
                                    window.scrollY &&
                            g.getBoundingClientRect().left + window.scrollX >
                                s.getBoundingClientRect().left + window.scrollX
                        )
                            X("drop");
                        else if (v && 0 == i.length) q();
                        else if (v)
                            for (
                                var t = i.map((e) => e.id), o = 0;
                                o < i.length;
                                o++
                            ) {
                                if (k(t[o])) {
                                    (v = !1),
                                        c(
                                            g,
                                            !1,
                                            document.querySelector(
                                                ".blockid[value='" + t[o] + "']"
                                            ).parentNode
                                        )
                                            ? T(g, o, t)
                                            : ((v = !1), q());
                                    break;
                                }
                                o == i.length - 1 && ((v = !1), q());
                            }
                        else if (R)
                            for (
                                t = i.map((e) => e.id), o = 0;
                                o < i.length;
                                o++
                            ) {
                                if (k(t[o])) {
                                    (v = !1),
                                        g.classList.remove("dragging"),
                                        T(g, o, t);
                                    break;
                                }
                                if (o == i.length - 1) {
                                    if (
                                        a(g, i.filter((e) => e.id == t[o])[0])
                                    ) {
                                        (v = !1),
                                            g.classList.remove("dragging"),
                                            T(g, t.indexOf(b), t);
                                        break;
                                    }
                                    (R = !1), (n = []), (v = !1), q();
                                    break;
                                }
                            }
                }),
                (flowy.moveBlock = function (e) {
                    if (
                        (e.targetTouches
                            ? ((y = e.targetTouches[0].clientX),
                              (C = e.targetTouches[0].clientY))
                            : ((y = e.clientX), (C = e.clientY)),
                        S)
                    ) {
                        (R = !0), g.classList.add("dragging");
                        var t = parseInt(g.querySelector(".blockid").value);
                        (b = i.filter((e) => e.id == t)[0].parent),
                            n.push(i.filter((e) => e.id == t)[0]),
                            (i = i.filter(function (e) {
                                return e.id != t;
                            })),
                            0 != t &&
                                document
                                    .querySelector(
                                        ".arrowid[value='" + t + "']"
                                    )
                                    .parentNode.remove();
                        for (
                            var l = i.filter((e) => e.parent == t),
                                o = !1,
                                r = [],
                                d = [];
                            !o;

                        ) {
                            for (var c = 0; c < l.length; c++)
                                if (l[c] != t) {
                                    n.push(i.filter((e) => e.id == l[c].id)[0]);
                                    const e = document.querySelector(
                                            ".blockid[value='" + l[c].id + "']"
                                        ).parentNode,
                                        t = document.querySelector(
                                            ".arrowid[value='" + l[c].id + "']"
                                        ).parentNode;
                                    (e.style.left =
                                        e.getBoundingClientRect().left +
                                        window.scrollX -
                                        (g.getBoundingClientRect().left +
                                            window.scrollX) +
                                        "px"),
                                        (e.style.top =
                                            e.getBoundingClientRect().top +
                                            window.scrollY -
                                            (g.getBoundingClientRect().top +
                                                window.scrollY) +
                                            "px"),
                                        (t.style.left =
                                            t.getBoundingClientRect().left +
                                            window.scrollX -
                                            (g.getBoundingClientRect().left +
                                                window.scrollX) +
                                            "px"),
                                        (t.style.top =
                                            t.getBoundingClientRect().top +
                                            window.scrollY -
                                            (g.getBoundingClientRect().top +
                                                window.scrollY) +
                                            "px"),
                                        g.appendChild(e),
                                        g.appendChild(t),
                                        r.push(l[c].id),
                                        d.push(l[c].id);
                                }
                            0 == r.length
                                ? (o = !0)
                                : ((l = i.filter((e) => r.includes(e.parent))),
                                  (r = []));
                        }
                        for (
                            c = 0;
                            c < i.filter((e) => e.parent == t).length;
                            c++
                        ) {
                            var a = i.filter((e) => e.parent == t)[c];
                            i = i.filter(function (e) {
                                return e.id != a;
                            });
                        }
                        for (c = 0; c < d.length; c++) {
                            a = d[c];
                            i = i.filter(function (e) {
                                return e.id != a;
                            });
                        }
                        i.length > 1 && D(), (S = !1);
                    }
                    if (
                        (v
                            ? ((g.style.left = y - w + "px"),
                              (g.style.top = C - f + "px"))
                            : R &&
                              ((g.style.left =
                                  y -
                                  w -
                                  (window.scrollX + u) +
                                  s.scrollLeft +
                                  "px"),
                              (g.style.top =
                                  C -
                                  f -
                                  (window.scrollY + p) +
                                  s.scrollTop +
                                  "px"),
                              (n.filter(
                                  (e) =>
                                      e.id ==
                                      parseInt(
                                          g.querySelector(".blockid").value
                                      )
                              ).x =
                                  g.getBoundingClientRect().left +
                                  window.scrollX +
                                  parseInt(window.getComputedStyle(g).width) /
                                      2 +
                                  s.scrollLeft),
                              (n.filter(
                                  (e) =>
                                      e.id ==
                                      parseInt(
                                          g.querySelector(".blockid").value
                                      )
                              ).y =
                                  g.getBoundingClientRect().top +
                                  window.scrollY +
                                  parseInt(window.getComputedStyle(g).height) /
                                      2 +
                                  s.scrollTop)),
                        v || R)
                    ) {
                        y >
                            s.getBoundingClientRect().width +
                                s.getBoundingClientRect().left -
                                10 &&
                        y <
                            s.getBoundingClientRect().width +
                                s.getBoundingClientRect().left +
                                10
                            ? (s.scrollLeft += 10)
                            : y < s.getBoundingClientRect().left + 10 &&
                              y > s.getBoundingClientRect().left - 10
                            ? (s.scrollLeft -= 10)
                            : C >
                                  s.getBoundingClientRect().height +
                                      s.getBoundingClientRect().top -
                                      10 &&
                              C <
                                  s.getBoundingClientRect().height +
                                      s.getBoundingClientRect().top +
                                      10
                            ? (s.scrollTop += 10)
                            : C < s.getBoundingClientRect().top + 10 &&
                              C > s.getBoundingClientRect().top - 10 &&
                              (s.scrollLeft -= 10);
                        g.getBoundingClientRect().left,
                            window.scrollX,
                            parseInt(window.getComputedStyle(g).width),
                            s.scrollLeft,
                            s.getBoundingClientRect().left,
                            g.getBoundingClientRect().top,
                            window.scrollY,
                            s.scrollTop,
                            s.getBoundingClientRect().top;
                        var h = i.map((e) => e.id);
                        for (c = 0; c < i.length; c++) {
                            if (k(h[c])) {
                                document
                                    .querySelector(
                                        ".blockid[value='" + h[c] + "']"
                                    )
                                    .parentNode.appendChild(
                                        document.querySelector(".indicator")
                                    ),
                                    (document.querySelector(
                                        ".indicator"
                                    ).style.left =
                                        document.querySelector(
                                            ".blockid[value='" + h[c] + "']"
                                        ).parentNode.offsetWidth /
                                            2 -
                                        5 +
                                        "px"),
                                    (document.querySelector(
                                        ".indicator"
                                    ).style.top =
                                        document.querySelector(
                                            ".blockid[value='" + h[c] + "']"
                                        ).parentNode.offsetHeight + "px"),
                                    document
                                        .querySelector(".indicator")
                                        .classList.remove("invisible");
                                break;
                            }
                            c == i.length - 1 &&
                                (document
                                    .querySelector(".indicator")
                                    .classList.contains("invisible") ||
                                    document
                                        .querySelector(".indicator")
                                        .classList.add("invisible"));
                        }
                    }
                }),
                document.addEventListener("mousedown", flowy.beginDrag),
                document.addEventListener("mousedown", Y, !1),
                document.addEventListener("touchstart", flowy.beginDrag),
                document.addEventListener("touchstart", Y, !1),
                document.addEventListener("mouseup", Y, !1),
                document.addEventListener("mousemove", flowy.moveBlock, !1),
                document.addEventListener("touchmove", flowy.moveBlock, !1),
                document.addEventListener("mouseup", flowy.endDrag, !1),
                document.addEventListener("touchend", flowy.endDrag, !1);
        }
        function k(e) {
            const t =
                    g.getBoundingClientRect().left +
                    window.scrollX +
                    parseInt(window.getComputedStyle(g).width) / 2 +
                    s.scrollLeft -
                    s.getBoundingClientRect().left,
                l =
                    g.getBoundingClientRect().top +
                    window.scrollY +
                    s.scrollTop -
                    s.getBoundingClientRect().top;
            return (
                t >=
                    i.filter((t) => t.id == e)[0].x -
                        i.filter((t) => t.id == e)[0].width / 2 -
                        m &&
                t <=
                    i.filter((t) => t.id == e)[0].x +
                        i.filter((t) => t.id == e)[0].width / 2 +
                        m &&
                l >=
                    i.filter((t) => t.id == e)[0].y -
                        i.filter((t) => t.id == e)[0].height / 2 &&
                l <=
                    i.filter((t) => t.id == e)[0].y +
                        i.filter((t) => t.id == e)[0].height
            );
        }
        function q() {
            s.appendChild(document.querySelector(".indicator")),
                g.parentNode.removeChild(g);
        }
        function X(e) {
            if ("drop" == e)
                c(g, !0, void 0),
                    (v = !1),
                    (g.style.top =
                        g.getBoundingClientRect().top +
                        window.scrollY -
                        (p + window.scrollY) +
                        s.scrollTop +
                        "px"),
                    (g.style.left =
                        g.getBoundingClientRect().left +
                        window.scrollX -
                        (u + window.scrollX) +
                        s.scrollLeft +
                        "px"),
                    s.appendChild(g),
                    i.push({
                        parent: -1,
                        childwidth: 0,
                        id: parseInt(g.querySelector(".blockid").value),
                        x:
                            g.getBoundingClientRect().left +
                            window.scrollX +
                            parseInt(window.getComputedStyle(g).width) / 2 +
                            s.scrollLeft -
                            s.getBoundingClientRect().left,
                        y:
                            g.getBoundingClientRect().top +
                            window.scrollY +
                            parseInt(window.getComputedStyle(g).height) / 2 +
                            s.scrollTop -
                            s.getBoundingClientRect().top,
                        width: parseInt(window.getComputedStyle(g).width),
                        height: parseInt(window.getComputedStyle(g).height),
                    });
            else if ("rearrange" == e) {
                g.classList.remove("dragging"), (R = !1);
                for (var t = 0; t < n.length; t++)
                    if (
                        n[t].id != parseInt(g.querySelector(".blockid").value)
                    ) {
                        const e = document.querySelector(
                                ".blockid[value='" + n[t].id + "']"
                            ).parentNode,
                            l = document.querySelector(
                                ".arrowid[value='" + n[t].id + "']"
                            ).parentNode;
                        (e.style.left =
                            e.getBoundingClientRect().left +
                            window.scrollX -
                            window.scrollX +
                            s.scrollLeft -
                            1 -
                            u +
                            "px"),
                            (e.style.top =
                                e.getBoundingClientRect().top +
                                window.scrollY -
                                window.scrollY +
                                s.scrollTop -
                                p -
                                1 +
                                "px"),
                            (l.style.left =
                                l.getBoundingClientRect().left +
                                window.scrollX -
                                window.scrollX +
                                s.scrollLeft -
                                u -
                                1 +
                                "px"),
                            (l.style.top =
                                l.getBoundingClientRect().top +
                                window.scrollY +
                                s.scrollTop -
                                1 -
                                p +
                                "px"),
                            s.appendChild(e),
                            s.appendChild(l),
                            (n[t].x =
                                e.getBoundingClientRect().left +
                                window.scrollX +
                                parseInt(e.offsetWidth) / 2 +
                                s.scrollLeft -
                                s.getBoundingClientRect().left -
                                1),
                            (n[t].y =
                                e.getBoundingClientRect().top +
                                window.scrollY +
                                parseInt(e.offsetHeight) / 2 +
                                s.scrollTop -
                                s.getBoundingClientRect().top -
                                1);
                    }
                (n.filter((e) => 0 == e.id)[0].x =
                    g.getBoundingClientRect().left +
                    window.scrollX +
                    parseInt(window.getComputedStyle(g).width) / 2 +
                    s.scrollLeft -
                    s.getBoundingClientRect().left),
                    (n.filter((e) => 0 == e.id)[0].y =
                        g.getBoundingClientRect().top +
                        window.scrollY +
                        parseInt(window.getComputedStyle(g).height) / 2 +
                        s.scrollTop -
                        s.getBoundingClientRect().top),
                    (i = i.concat(n)),
                    (n = []);
            }
        }
        function I(e, t, l, n) {
            t < 0
                ? ((s.innerHTML +=
                      '<div class="arrowblock"><input type="hidden" class="arrowid" value="' +
                      g.querySelector(".blockid").value +
                      '"><svg preserveaspectratio="none" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M' +
                      (i.filter((e) => e.id == n)[0].x - e.x + 5) +
                      " 0L" +
                      (i.filter((e) => e.id == n)[0].x - e.x + 5) +
                      " " +
                      B / 2 +
                      "L5 " +
                      B / 2 +
                      "L5 " +
                      l +
                      '" stroke="#C5CCD0" stroke-width="2px"/><path d="M0 ' +
                      (l - 5) +
                      "H10L5 " +
                      l +
                      "L0 " +
                      (l - 5) +
                      'Z" fill="#C5CCD0"/></svg></div>'),
                  (document.querySelector(
                      '.arrowid[value="' +
                          g.querySelector(".blockid").value +
                          '"]'
                  ).parentNode.style.left =
                      e.x -
                      5 -
                      (u + window.scrollX) +
                      s.scrollLeft +
                      s.getBoundingClientRect().left +
                      "px"))
                : ((s.innerHTML +=
                      '<div class="arrowblock"><input type="hidden" class="arrowid" value="' +
                      g.querySelector(".blockid").value +
                      '"><svg preserveaspectratio="none" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 0L20 ' +
                      B / 2 +
                      "L" +
                      t +
                      " " +
                      B / 2 +
                      "L" +
                      t +
                      " " +
                      l +
                      '" stroke="#C5CCD0" stroke-width="2px"/><path d="M' +
                      (t - 5) +
                      " " +
                      (l - 5) +
                      "H" +
                      (t + 5) +
                      "L" +
                      t +
                      " " +
                      l +
                      "L" +
                      (t - 5) +
                      " " +
                      (l - 5) +
                      'Z" fill="#C5CCD0"/></svg></div>'),
                  (document.querySelector(
                      '.arrowid[value="' +
                          parseInt(g.querySelector(".blockid").value) +
                          '"]'
                  ).parentNode.style.left =
                      i.filter((e) => e.id == n)[0].x -
                      20 -
                      (u + window.scrollX) +
                      s.scrollLeft +
                      s.getBoundingClientRect().left +
                      "px")),
                (document.querySelector(
                    '.arrowid[value="' +
                        parseInt(g.querySelector(".blockid").value) +
                        '"]'
                ).parentNode.style.top =
                    i.filter((e) => e.id == n)[0].y +
                    i.filter((e) => e.id == n)[0].height / 2 +
                    s.getBoundingClientRect().top -
                    p +
                    "px");
        }
        function N(e, t, l, n) {
            t < 0
                ? ((document.querySelector(
                      '.arrowid[value="' + n.id + '"]'
                  ).parentNode.style.left =
                      e.x -
                      5 -
                      (u + window.scrollX) +
                      s.getBoundingClientRect().left +
                      "px"),
                  (document.querySelector(
                      '.arrowid[value="' + n.id + '"]'
                  ).parentNode.innerHTML =
                      '<input type="hidden" class="arrowid" value="' +
                      n.id +
                      '"><svg preserveaspectratio="none" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M' +
                      (i.filter((e) => e.id == n.parent)[0].x - e.x + 5) +
                      " 0L" +
                      (i.filter((e) => e.id == n.parent)[0].x - e.x + 5) +
                      " " +
                      B / 2 +
                      "L5 " +
                      B / 2 +
                      "L5 " +
                      l +
                      '" stroke="#C5CCD0" stroke-width="2px"/><path d="M0 ' +
                      (l - 5) +
                      "H10L5 " +
                      l +
                      "L0 " +
                      (l - 5) +
                      'Z" fill="#C5CCD0"/></svg>'))
                : ((document.querySelector(
                      '.arrowid[value="' + n.id + '"]'
                  ).parentNode.style.left =
                      i.filter((e) => e.id == n.parent)[0].x -
                      20 -
                      (u + window.scrollX) +
                      s.getBoundingClientRect().left +
                      "px"),
                  (document.querySelector(
                      '.arrowid[value="' + n.id + '"]'
                  ).parentNode.innerHTML =
                      '<input type="hidden" class="arrowid" value="' +
                      n.id +
                      '"><svg preserveaspectratio="none" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 0L20 ' +
                      B / 2 +
                      "L" +
                      t +
                      " " +
                      B / 2 +
                      "L" +
                      t +
                      " " +
                      l +
                      '" stroke="#C5CCD0" stroke-width="2px"/><path d="M' +
                      (t - 5) +
                      " " +
                      (l - 5) +
                      "H" +
                      (t + 5) +
                      "L" +
                      t +
                      " " +
                      l +
                      "L" +
                      (t - 5) +
                      " " +
                      (l - 5) +
                      'Z" fill="#C5CCD0"/></svg>'));
        }
        function T(e, t, l) {
            R || s.appendChild(e);
            for (
                var o = 0, r = 0, d = 0;
                d < i.filter((e) => e.parent == l[t]).length;
                d++
            ) {
                (f = i.filter((e) => e.parent == l[t])[d]).childwidth > f.width
                    ? (o += f.childwidth + m)
                    : (o += f.width + m);
            }
            o += parseInt(window.getComputedStyle(e).width);
            for (d = 0; d < i.filter((e) => e.parent == l[t]).length; d++) {
                (f = i.filter((e) => e.parent == l[t])[d]).childwidth > f.width
                    ? ((document.querySelector(
                          ".blockid[value='" + f.id + "']"
                      ).parentNode.style.left =
                          i.filter((e) => e.id == l[t])[0].x -
                          o / 2 +
                          r +
                          f.childwidth / 2 -
                          f.width / 2 +
                          "px"),
                      (f.x =
                          i.filter((e) => e.parent == l[t])[0].x -
                          o / 2 +
                          r +
                          f.childwidth / 2),
                      (r += f.childwidth + m))
                    : ((document.querySelector(
                          ".blockid[value='" + f.id + "']"
                      ).parentNode.style.left =
                          i.filter((e) => e.id == l[t])[0].x -
                          o / 2 +
                          r +
                          "px"),
                      (f.x =
                          i.filter((e) => e.parent == l[t])[0].x -
                          o / 2 +
                          r +
                          f.width / 2),
                      (r += f.width + m));
            }
            if (
                ((e.style.left =
                    i.filter((e) => e.id == l[t])[0].x -
                    o / 2 +
                    r -
                    (window.scrollX + u) +
                    s.scrollLeft +
                    s.getBoundingClientRect().left +
                    "px"),
                (e.style.top =
                    i.filter((e) => e.id == l[t])[0].y +
                    i.filter((e) => e.id == l[t])[0].height / 2 +
                    B -
                    (window.scrollY + p) +
                    s.getBoundingClientRect().top +
                    "px"),
                R)
            ) {
                (n.filter(
                    (t) => t.id == parseInt(e.querySelector(".blockid").value)
                )[0].x =
                    e.getBoundingClientRect().left +
                    window.scrollX +
                    parseInt(window.getComputedStyle(e).width) / 2 +
                    s.scrollLeft -
                    s.getBoundingClientRect().left),
                    (n.filter(
                        (t) =>
                            t.id == parseInt(e.querySelector(".blockid").value)
                    )[0].y =
                        e.getBoundingClientRect().top +
                        window.scrollY +
                        parseInt(window.getComputedStyle(e).height) / 2 +
                        s.scrollTop -
                        s.getBoundingClientRect().top),
                    (n.filter(
                        (t) => t.id == e.querySelector(".blockid").value
                    )[0].parent = l[t]);
                for (d = 0; d < n.length; d++)
                    if (
                        n[d].id != parseInt(e.querySelector(".blockid").value)
                    ) {
                        const e = document.querySelector(
                                ".blockid[value='" + n[d].id + "']"
                            ).parentNode,
                            t = document.querySelector(
                                ".arrowid[value='" + n[d].id + "']"
                            ).parentNode;
                        (e.style.left =
                            e.getBoundingClientRect().left +
                            window.scrollX -
                            (window.scrollX + s.getBoundingClientRect().left) +
                            s.scrollLeft +
                            "px"),
                            (e.style.top =
                                e.getBoundingClientRect().top +
                                window.scrollY -
                                (window.scrollY +
                                    s.getBoundingClientRect().top) +
                                s.scrollTop +
                                "px"),
                            (t.style.left =
                                t.getBoundingClientRect().left +
                                window.scrollX -
                                (window.scrollX +
                                    s.getBoundingClientRect().left) +
                                s.scrollLeft +
                                20 +
                                "px"),
                            (t.style.top =
                                t.getBoundingClientRect().top +
                                window.scrollY -
                                (window.scrollY +
                                    s.getBoundingClientRect().top) +
                                s.scrollTop +
                                "px"),
                            s.appendChild(e),
                            s.appendChild(t),
                            (n[d].x =
                                e.getBoundingClientRect().left +
                                window.scrollX +
                                parseInt(window.getComputedStyle(e).width) / 2 +
                                s.scrollLeft -
                                s.getBoundingClientRect().left),
                            (n[d].y =
                                e.getBoundingClientRect().top +
                                window.scrollY +
                                parseInt(window.getComputedStyle(e).height) /
                                    2 +
                                s.scrollTop -
                                s.getBoundingClientRect().top);
                    }
                (i = i.concat(n)), (n = []);
            } else
                i.push({
                    childwidth: 0,
                    parent: l[t],
                    id: parseInt(e.querySelector(".blockid").value),
                    x:
                        e.getBoundingClientRect().left +
                        window.scrollX +
                        parseInt(window.getComputedStyle(e).width) / 2 +
                        s.scrollLeft -
                        s.getBoundingClientRect().left,
                    y:
                        e.getBoundingClientRect().top +
                        window.scrollY +
                        parseInt(window.getComputedStyle(e).height) / 2 +
                        s.scrollTop -
                        s.getBoundingClientRect().top,
                    width: parseInt(window.getComputedStyle(e).width),
                    height: parseInt(window.getComputedStyle(e).height),
                });
            var c = i.filter(
                (t) => t.id == parseInt(e.querySelector(".blockid").value)
            )[0];
            if (
                (I(c, c.x - i.filter((e) => e.id == l[t])[0].x + 20, B, l[t]),
                -1 != i.filter((e) => e.id == l[t])[0].parent)
            ) {
                for (var a = !1, g = l[t]; !a; )
                    if (-1 == i.filter((e) => e.id == g)[0].parent) a = !0;
                    else {
                        var w = 0;
                        for (
                            d = 0;
                            d < i.filter((e) => e.parent == g).length;
                            d++
                        ) {
                            var f;
                            (f = i.filter((e) => e.parent == g)[d]).childwidth >
                            f.width
                                ? d == i.filter((e) => e.parent == g).length - 1
                                    ? (w += f.childwidth)
                                    : (w += f.childwidth + m)
                                : d == i.filter((e) => e.parent == g).length - 1
                                ? (w += f.width)
                                : (w += f.width + m);
                        }
                        (i.filter((e) => e.id == g)[0].childwidth = w),
                            (g = i.filter((e) => e.id == g)[0].parent);
                    }
                i.filter((e) => e.id == g)[0].childwidth = o;
            }
            R && ((R = !1), e.classList.remove("dragging")), D(), E();
        }
        function Y(e) {
            if (((S = !1), M(e.target, "block"))) {
                var t = e.target.closest(".block");
                e.targetTouches
                    ? ((y = e.targetTouches[0].clientX),
                      (C = e.targetTouches[0].clientY))
                    : ((y = e.clientX), (C = e.clientY)),
                    "mouseup" !== e.type &&
                        M(e.target, "block") &&
                        3 != e.which &&
                        (v ||
                            R ||
                            ((S = !0),
                            (w =
                                y -
                                ((g = t).getBoundingClientRect().left +
                                    window.scrollX)),
                            (f =
                                C -
                                (g.getBoundingClientRect().top +
                                    window.scrollY))));
            }
        }
        function M(e, t) {
            return (
                !!(e.className && e.className.split(" ").indexOf(t) >= 0) ||
                (e.parentNode && M(e.parentNode, t))
            );
        }
        function E() {
            x = i.map((e) => e.x);
            var e = i.map((e) => e.width),
                t = x.map(function (t, l) {
                    return t - e[l] / 2;
                });
            if (
                (x = Math.min.apply(Math, t)) <
                s.getBoundingClientRect().left + window.scrollX - u
            ) {
                for (var l = i.map((e) => e.id), n = 0; n < i.length; n++)
                    if (
                        ((document.querySelector(
                            ".blockid[value='" +
                                i.filter((e) => e.id == l[n])[0].id +
                                "']"
                        ).parentNode.style.left =
                            i.filter((e) => e.id == l[n])[0].x -
                            i.filter((e) => e.id == l[n])[0].width / 2 -
                            x +
                            s.getBoundingClientRect().left -
                            u +
                            20 +
                            "px"),
                        -1 != i.filter((e) => e.id == l[n])[0].parent)
                    ) {
                        var o = i.filter((e) => e.id == l[n])[0],
                            r =
                                o.x -
                                i.filter(
                                    (e) =>
                                        e.id ==
                                        i.filter((e) => e.id == l[n])[0].parent
                                )[0].x;
                        document.querySelector(
                            '.arrowid[value="' + l[n] + '"]'
                        ).parentNode.style.left =
                            r < 0
                                ? o.x -
                                  x +
                                  20 -
                                  5 +
                                  s.getBoundingClientRect().left -
                                  u +
                                  "px"
                                : i.filter(
                                      (e) =>
                                          e.id ==
                                          i.filter((e) => e.id == l[n])[0]
                                              .parent
                                  )[0].x -
                                  20 -
                                  x +
                                  s.getBoundingClientRect().left -
                                  u +
                                  20 +
                                  "px";
                    }
                for (n = 0; n < i.length; n++)
                    i[n].x =
                        document
                            .querySelector(".blockid[value='" + i[n].id + "']")
                            .parentNode.getBoundingClientRect().left +
                        window.scrollX +
                        s.scrollLeft +
                        parseInt(
                            window.getComputedStyle(
                                document.querySelector(
                                    ".blockid[value='" + i[n].id + "']"
                                ).parentNode
                            ).width
                        ) /
                            2 -
                        20 -
                        s.getBoundingClientRect().left;
            }
        }
        function D() {
            for (var e = i.map((e) => e.parent), t = 0; t < e.length; t++) {
                -1 == e[t] && t++;
                for (
                    var l = 0, n = 0, o = 0;
                    o < i.filter((l) => l.parent == e[t]).length;
                    o++
                ) {
                    var r = i.filter((l) => l.parent == e[t])[o];
                    0 == i.filter((e) => e.parent == r.id).length &&
                        (r.childwidth = 0),
                        r.childwidth > r.width
                            ? o == i.filter((l) => l.parent == e[t]).length - 1
                                ? (l += r.childwidth)
                                : (l += r.childwidth + m)
                            : o == i.filter((l) => l.parent == e[t]).length - 1
                            ? (l += r.width)
                            : (l += r.width + m);
                }
                -1 != e[t] && (i.filter((l) => l.id == e[t])[0].childwidth = l);
                for (o = 0; o < i.filter((l) => l.parent == e[t]).length; o++) {
                    r = i.filter((l) => l.parent == e[t])[o];
                    const c = document.querySelector(
                            ".blockid[value='" + r.id + "']"
                        ).parentNode,
                        a = i.filter((l) => l.id == e[t]);
                    (c.style.top =
                        a.y + B + s.getBoundingClientRect().top - p + "px"),
                        (a.y = a.y + B),
                        r.childwidth > r.width
                            ? ((c.style.left =
                                  a[0].x -
                                  l / 2 +
                                  n +
                                  r.childwidth / 2 -
                                  r.width / 2 -
                                  (u + window.scrollX) +
                                  s.getBoundingClientRect().left +
                                  "px"),
                              (r.x = a[0].x - l / 2 + n + r.childwidth / 2),
                              (n += r.childwidth + m))
                            : ((c.style.left =
                                  a[0].x -
                                  l / 2 +
                                  n -
                                  (u + window.scrollX) +
                                  s.getBoundingClientRect().left +
                                  "px"),
                              (r.x = a[0].x - l / 2 + n + r.width / 2),
                              (n += r.width + m));
                    var d = i.filter((e) => e.id == r.id)[0];
                    N(
                        d,
                        d.x - i.filter((e) => e.id == r.parent)[0].x + 20,
                        B,
                        r
                    );
                }
            }
        }
    }),
        flowy.load();
};
