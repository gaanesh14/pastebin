import { useState } from "react";
import API from "../services/api";
import { savePaste } from "../utils/PasteStorage";

const CreatePaste = () => {
  const [content, setContent] = useState("");
  const [expireMinutes, setExpireMinutes] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async () => {
    if (!content.trim()) return;

    const res = await API.post("/api/paste", {
      content,
      expireMinutes,
      maxViews,
    });

    const pasteLink = res.data.link;
    setLink(pasteLink);

    savePaste({
      link: pasteLink,
      createdAt: Date.now(),
      expireMinutes,
      maxViews,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Create a Link
        </h2>

        <textarea
          rows="6"
          placeholder="Paste your text here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <div className="grid grid-cols-2 gap-4 mt-4">
          <input
            type="number"
            placeholder="Expire (minutes)"
            value={expireMinutes}
            onChange={(e) => setExpireMinutes(e.target.value)}
            className="border rounded-lg p-2"
          />
          <input
            type="number"
            placeholder="Max views"
            value={maxViews}
            onChange={(e) => setMaxViews(e.target.value)}
            className="border rounded-lg p-2"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Create Link
        </button>

        {link && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-green-700 font-medium">Paste created!</p>
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline break-all"
            >
              {link}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePaste;
