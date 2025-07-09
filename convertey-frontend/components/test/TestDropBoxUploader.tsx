"use client";

import { useEffect, useState } from "react";

export default function TestDropboxUploader() {
  const [isDropboxReady, setIsDropboxReady] = useState(false);

  useEffect(() => {
    // If already loaded, skip
    if (typeof window.Dropbox !== "undefined") {
      setIsDropboxReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.dropbox.com/static/api/2/dropins.js";
    script.id = "dropboxjs";
    script.type = "text/javascript";
    script.setAttribute(
      "data-app-key",
      process.env.NEXT_PUBLIC_DROPBOX_APP_KEY || ""
    );

    script.onload = () => {
      console.log("Dropbox SDK loaded!");
      setIsDropboxReady(true);
    };

    script.onerror = () => {
      console.error("Failed to load Dropbox SDK");
    };

    document.body.appendChild(script);
  }, []);

  const openDropbox = () => {
    if (!window.Dropbox) {
      console.error("Dropbox SDK not loaded");
      return;
    }

    window.Dropbox.choose({
      linkType: "direct",
      multiselect: false,
      success: (files: DropboxFile[]) => {
        console.log("Chosen file:", files[0]);
      },
      cancel: () => {
        console.log("User canceled Dropbox picker.");
      },
    });
  };

  return (
    <button
      onClick={openDropbox}
      className="px-4 py-2 bg-blue-600 text-white rounded"
      disabled={!isDropboxReady}
    >
      Upload from Dropbox
    </button>
  );
}
