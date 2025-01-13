"use client";

import React, { useEffect, useState, useRef } from "react";
import Topbar from "@/containers/dashboard/top-bar";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";
import loadjs from "loadjs";

const twScriptUrl = "https://platform.twitter.com/widgets.js";
const twScriptWindowFieldName = "twttr";
const twScriptName = twScriptWindowFieldName;

const childDivIdentifyingAttribute = "twdiv";

const TimelineComponent = () => {
  const [canUseDOM, setCanUseDOM] = useState(false);

  useEffect(() => {
    setCanUseDOM(
      !!(
        typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
      )
    );
  }, []);

  function loadTwitterLibrary() {
    if (!loadjs.isDefined(twScriptName)) {
      loadjs(twScriptUrl, twScriptName);
    }
  }

  function twWidgetFactory() {
    return new Promise((resolve, reject) => {
      const rejectWithError = () =>
        reject(new Error("Could not load remote twitter widgets js"));

      loadTwitterLibrary();

      loadjs.ready(twScriptName, {
        success: () => {
          const twttr = window[twScriptWindowFieldName];
          if (!twttr || !twttr.widgets) {
            rejectWithError();
          }
          resolve(twttr.widgets);
        },
        error: rejectWithError,
      });
    });
  }

  function removeChildrenWithAttribute(node, attribute) {
    if (node) {
      node.querySelectorAll("*").forEach((child) => {
        if (child.hasAttribute(attribute)) {
          child.remove();
        }
      });
    }
  }

  function is(x, y) {
    if (x === y) {
      return x !== 0 || y !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  }

  function isShallowEqual(objA, objB) {
    if (is(objA, objB)) {
      return true;
    }

    if (
      typeof objA !== "object" ||
      objA === null ||
      typeof objB !== "object" ||
      objB === null
    ) {
      return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (let i = 0; i < keysA.length; i++) {
      if (
        !Object.prototype.hasOwnProperty.call(objB, keysA[i]) ||
        !is(objA[keysA[i]], objB[keysA[i]])
      ) {
        return false;
      }
    }

    return true;
  }

  function useShallowCompareMemoize(value) {
    const ref = useRef();
    if (!isShallowEqual(value, ref.current)) {
      ref.current = value;
    }
    return ref.current;
  }

  function cloneShallow(value) {
    return typeof value === "object" ? Object.assign({}, value) : value;
  }

  function useTwitterWidget(factoryFunctionName, primaryArg, options, onLoad) {
    const [error, setError] = useState(null);
    const ref = useRef(null);

    // Ensure canUseDOM is checked only once on mount, not inside hooks
    const deps = [
      factoryFunctionName,
      useShallowCompareMemoize(primaryArg),
      useShallowCompareMemoize(options),
    ];

    useEffect(() => {
      if (!canUseDOM) return; // This check should be inside useEffect

      setError(null);

      let isCanceled = false;

      if (ref.current) {
        removeChildrenWithAttribute(ref.current, childDivIdentifyingAttribute);

        if (!ref || !ref.current) return;

        const childEl = document.createElement("div");
        childEl.setAttribute(childDivIdentifyingAttribute, "yes");
        ref.current.appendChild(childEl);

        twWidgetFactory()
          .then((wf) => {
            return wf[factoryFunctionName](
              cloneShallow(primaryArg),
              childEl,
              cloneShallow(options)
            );
          })
          .then((resultMaybe) => {
            if (!resultMaybe && !isCanceled) {
              throw new Error(
                "Twitter could not create widget. Ensure the screenName/tweetId exists."
              );
            }

            if (isCanceled) {
              childEl.remove();
              return;
            }

            if (onLoad) {
              onLoad();
            }
          })
          .catch((e) => {
            console.error(e);
            setError(e);
          });
      }

      return () => {
        isCanceled = true;
      };
    }, deps);

    return { ref, error };
  }

  const Timeline = ({ dataSource, options, onLoad, renderError }) => {
    const { ref, error } = useTwitterWidget(
      "createTimeline",
      dataSource,
      options,
      onLoad
    );
    return <div ref={ref}>{error && renderError && renderError(error)}</div>;
  };

  const Tweet = ({ tweetId, options, onLoad, renderError }) => {
    const { ref, error } = useTwitterWidget(
      "createTweet",
      tweetId,
      options,
      onLoad
    );
    return <div ref={ref}>{error && renderError && renderError(error)}</div>;
  };

  return (
    <AuthNavLayout>
      <main className="w-full min-h-screen text-white bg-[#0B0228] p-4 sm:p-6">
        <Topbar>
          <p className="text-xl font-bold">Timeline</p>
        </Topbar>

        <section className="flex flex-col gap-2 mt-5 mb-20">
          <Timeline
            dataSource={{ sourceType: "profile", screenName: "ribbonprotocol" }}
          />

          <Tweet tweetId="1783448062242816398" />

          <Timeline
            dataSource={{ sourceType: "profile", screenName: "reactjs" }}
          />
        </section>
      </main>
    </AuthNavLayout>
  );
};

export default TimelineComponent;
