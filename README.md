# FluentPDF - Bulletproof PDF Engine

FluentPDF is a powerful, browser-based Single Page Application (SPA) designed to convert technical documents (PDFs) into engaging audio scripts suitable for Text-to-Speech (TTS) engines. It leverages advanced Large Language Models (LLMs) to intelligently rewrite raw code, tables, diagrams, and technical jargon into natural, descriptive English.

**"Bulletproof PDF Engine"**: Designed for resilience, FluentPDF handles large documents by chunking them and processing them in parallel across multiple LLM providers, ensuring that even if one provider fails or rate-limits, the process continues seamlessly.

## 🚀 Key Features

*   **Intelligent PDF Parsing**: visually parses PDF documents to extract text while maintaining context.
*   **Natural Language Transformation**: Converts code blocks, SQL queries, and complex data tables into narrative descriptions (e.g., "The code defines a function that calculates...").
*   **Multi-Provider Support**: Integrate with top-tier LLM providers including:
    *   **Gemini** (Google)
    *   **Groq** (Llama, Mixtral, Gemma)
    *   **Cerebras**
    *   **OpenRouter** (DeepSeek, etc.)
    *   **SambaNova**
    *   **Mistral**
    *   **Cohere**
*   **Bulletproof Resilience**:
    *   **Unlimited Concurrency**: Process hundreds of chunks simultaneously.
    *   **Auto-Failover**: Automatically switches models/providers on API errors or rate limits.
    *   **Infinite Retry**: Will keep trying until a chunk is successfully processed.
*   **Customizable Workflow**:
    *   **Drag-and-Drop Model Priority**: Define which models to attempt first.
    *   **Custom Prompts**: Tweak the System Instruction and Transformation Rules to match your specific needs.
*   **Privacy Focused**: Runs entirely in your browser. Your files are processed locally and only the extracted text chunks are sent to the LLM APIs you configure.
*   **Local Caching**: Automatically caches converted books using IndexedDB, allowing you to reload previous works instantly.
*   **Dark Mode**: sleek UI with toggleable dark/light themes.

## 🛠️ Tech Stack

FluentPDF is built with modern web technologies and zero build steps:
*   **HTML5 / JavaScript (ES6+)**
*   **Tailwind CSS** (via CDN) for styling.
*   **Font Awesome** for icons.
*   **PDF.js** for PDF extraction.
*   **jsPDF** for generating the final script PDF.
*   **IDB** for IndexedDB interaction.
*   **Marked** for Markdown parsing.
*   **Sortable.js** for drag-and-drop interfaces.

## 📖 How It Works

1.  **Upload**: You drag and drop a PDF file into the application.
2.  **Extract**: The app uses `pdf.js` to extract raw text from the document.
3.  **Chunk**: The text is split into manageable chunks (approx. 15,000 characters).
4.  **Process**:
    *   The engine sends these chunks to the configured LLM providers in parallel.
    *   It follows your "Model Priority" list. If the first model fails (e.g., rate limit), it instantly tries the next one.
    *   The LLM rewrites the content based on the "Transformation Rules" (e.g., "Rewrite code as a narrative").
5.  **Assemble**: The processed chunks are reassembled.
6.  **Export**: A new PDF is generated (`fluentpdf_[filename].pdf`) containing the clean, read-aloud script.

## 🚦 Getting Started

### Prerequisites
*   A modern web browser (Chrome, Firefox, Edge, Safari).
*   API Keys for at least one of the supported providers (Gemini, Groq, etc.).

### Installation
No installation is required. FluentPDF is a standalone HTML file.

1.  Clone this repository or download the `index.html` file.
2.  Open `index.html` directly in your browser.

### Usage

1.  **Open Settings**: Click the sliders icon (<i class="fa-solid fa-sliders"></i>) in the top right.
2.  **Add API Keys**: Enter your API keys for the providers you wish to use.
    *   *Tip: Groq and Gemini often have generous free tiers.*
3.  **Configure Priority (Optional)**: Drag and drop models in the "Model Priority" list to set your preference order.
4.  **Upload PDF**: Drag your PDF book onto the drop zone.
5.  **Convert**: Click the "Convert" button.
6.  **Monitor**: Watch the progress bar and batch map.
    *   🟡 Yellow: Processing
    *   🟢 Green: Success
    *   🔴 Red: Retrying/Error
7.  **Download**: Once finished, download your optimized script.

## ⚙️ Configuration

The settings panel allows deep customization:

*   **Concurrency**: How many chunks to process in parallel (Default: 100). Higher numbers are faster but hit rate limits harder.
*   **System Instruction**: The persona the AI adopts (e.g., "You are an expert Audiobook Script Writer").
*   **Transformation Rules**: Specific rules for rewriting (e.g., "Do NOT read code verbatim").
*   **Config Backup**: Export your API keys and settings to a JSON file to move between devices.

## 🔒 Privacy & Security

*   **Local Processing**: All file parsing and PDF generation happens locally in your browser.
*   **API Keys**: Your API keys are stored in your browser's `localStorage` and are never sent to any server other than the respective LLM API endpoints.
*   **Data Usage**: The text content of your PDF is sent to the LLM providers for processing. Please review the data privacy policies of the providers you use (Google, Groq, etc.) regarding how they handle API data.

## 📄 License

This project is open-source. Feel free to modify and distribute.
