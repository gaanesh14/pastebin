import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const ViewPaste = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    API.get(`/paste/${id}`)
      .then((res) => setContent(res.data.content))
      .catch(() => setError("Paste expired or not found"));
  }, [id]);

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <h2 className="text-xl">{error}</h2>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">View Paste</h2>
        <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-auto">
          {content}
        </pre>
      </div>
    </div>
  );
};

export default ViewPaste;
