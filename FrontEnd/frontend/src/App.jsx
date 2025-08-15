import { useState } from "react"; // useEffect for prism.highlightAll is likely unneeded
import "prismjs/themes/prism-tomorrow.css"; // Theme for react-simple-code-editor
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight"; // For highlighting code in Markdown
import "highlight.js/styles/github-dark.css"; // Theme for highlight.js (used by rehypeHighlight)
import axios from "axios";
import "./App.css"; // Your custom CSS

function App() {
  const [code, setCode] = useState(`function calculateSum(a, b) {
  // This function adds two numbers
  const sum = a + b;
  return sum;
}`);

  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false);

  // Removed redundant useEffect for prism.highlightAll().
  // react-simple-code-editor's 'highlight' prop handles this dynamically.

  async function reviewCode() {
    setLoading(true); // Start loading
    setReview("Loading..."); // Provide immediate feedback to the user

    try {
      // IMPORTANT: Replace '/api/review-code' with your actual backend endpoint.
      // For local development, it might be 'http://localhost:3001/review-code'
      const response = await axios.post("http://localhost:3000/ai/getReview", {
        code: code, // Send the current code from the editor
      });

      // Assuming the backend responds with data like { review: "Your AI review" }
      setReview(response.data.response);
    } catch (error) {
      console.error("Error reviewing code:", error);
      // Provide a user-friendly error message, extracting details if available
      setReview(
        `Failed to get a code review. Please try again.
        ${
          error.response?.data?.message
            ? `Details: ${error.response.data.message}`
            : ""
        }`
      );
    } finally {
      setLoading(false); // Always stop loading, whether successful or not
    }
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>AI Code Reviewer</h1>
        <p>Enter your code below and get instant AI-powered feedback!</p>
      </header>

      <main className="app-main">
        <section className="code-input-section">
          <h2>Your Code</h2>
          <Editor
            value={code}
            onValueChange={(newCode) => setCode(newCode)}
            highlight={(newCode) =>
              prism.highlight(newCode, prism.languages.javascript, "javascript")
            }
            className="react-simple-code-editor"
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              backgroundColor: "#545353ff",
              color: "#ccc",
              border: "1px solid #555",
              borderRadius: "5px",
              minHeight: "200px",
              overflow: "auto",
              tabSize: 2,  
            }}
          />
          <button
            onClick={reviewCode}
            disabled={loading} // Disable button while loading to prevent multiple requests
            className="review-button"
          >
            {loading ? "Reviewing..." : "Get Code Review"}
          </button>
        </section>

        <section className="code-review-output-section">
          <h2>Code Review</h2>
          {review ? (
            <div className="review-content">
              {/* Markdown component will parse and render the AI review.
                  rehypeHighlight will automatically highlight code blocks within the markdown. */}
              <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
            </div>
          ) : (
            <p className="no-review-message">
              Your AI-powered code review will appear here after you click "Get
              Code Review".
            </p>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} AI Code Reviewer</p>
      </footer>
    </div>
  );
}

export default App;
