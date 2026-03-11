import { useState, useRef, useCallback, useEffect } from "react";

const ACCENT = "#FF3B3B";
const DARK = "#0a0a0a";
const CARD = "#141414";
const BORDER = "#2a2a2a";

const styles = {
  app: {
    minHeight: "100vh",
    background: DARK,
    color: "#fff",
    fontFamily: "'DM Mono', 'Courier New', monospace",
    padding: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    width: "100%",
    borderBottom: `1px solid ${BORDER}`,
    padding: "18px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#0d0d0d",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: "0.08em",
    color: "#fff",
  },
  logoAccent: { color: ACCENT },
  badge: {
    background: ACCENT,
    color: "#fff",
    fontSize: 10,
    fontWeight: 700,
    padding: "2px 7px",
    borderRadius: 4,
    letterSpacing: "0.1em",
  },
  settingsBtn: {
    background: "transparent",
    border: `1px solid ${BORDER}`,
    color: "#ccc",
    borderRadius: 6,
    padding: "6px 12px",
    fontSize: 12,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6
  },
  main: {
    width: "100%",
    maxWidth: 680,
    padding: "36px 20px 60px",
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  settingsCard: {
    background: "#111",
    border: `1px dashed ${BORDER}`,
    borderRadius: 12,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  settingsHeader: {
    fontSize: 12,
    letterSpacing: "0.1em",
    color: "#888",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  uploadZone: {
    border: `2px dashed ${BORDER}`,
    borderRadius: 12,
    padding: "40px 20px",
    textAlign: "center",
    cursor: "pointer",
    transition: "border-color 0.2s, background 0.2s",
    background: CARD,
    position: "relative",
    overflow: "hidden",
  },
  uploadZoneActive: {
    borderColor: ACCENT,
    background: "#1a0a0a",
  },
  uploadIcon: { fontSize: 36, marginBottom: 10 },
  uploadText: { fontSize: 14, color: "#888", lineHeight: 1.6 },
  uploadBold: { color: "#fff", fontWeight: 700 },
  previewWrap: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    background: CARD,
    border: `1px solid ${BORDER}`,
  },
  previewImg: {
    width: "100%",
    maxHeight: 380,
    objectFit: "contain",
    display: "block",
    background: "#111",
  },
  changeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    background: "rgba(0,0,0,0.7)",
    border: `1px solid ${BORDER}`,
    color: "#ccc",
    fontSize: 11,
    padding: "5px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
  card: {
    background: CARD,
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
    overflow: "hidden",
  },
  cardHeader: {
    padding: "14px 20px",
    borderBottom: `1px solid ${BORDER}`,
    fontSize: 11,
    letterSpacing: "0.12em",
    color: "#666",
    textTransform: "uppercase",
  },
  fieldRow: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: "16px 20px",
    borderBottom: `1px solid ${BORDER}`,
  },
  textarea: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: 14,
    lineHeight: 1.6,
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
    minHeight: 140,
    resize: "vertical",
  },
  label: { fontSize: 11, color: "#777", textTransform: "uppercase", letterSpacing: "0.08em" },
  input: {
    background: "#0d0d0d",
    border: `1px solid ${BORDER}`,
    color: "#fff",
    fontSize: 13,
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
    padding: "10px 14px",
    borderRadius: 6,
  },
  buttonRow: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    marginBottom: 8,
  },
  removeBtn: {
    background: "transparent",
    border: `1px solid ${BORDER}`,
    color: "#ff3b3b",
    width: 38,
    height: 38,
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    fontSize: 16,
  },
  addBtn: {
    background: "transparent",
    border: `1px dashed ${BORDER}`,
    color: "#888",
    padding: "12px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 12,
    width: "100%",
    textAlign: "center",
    marginTop: 4,
    transition: "color 0.2s, border-color 0.2s"
  },
  sendBtn: {
    background: ACCENT,
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "16px 24px",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.08em",
    cursor: "pointer",
    width: "100%",
    transition: "opacity 0.2s, transform 0.1s",
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10
  },
  sendBtnDisabled: { opacity: 0.5, cursor: "not-allowed" },
  statusBox: {
    padding: "14px 16px",
    borderRadius: 8,
    fontSize: 13,
    marginTop: 16,
    textAlign: "center"
  },
  errorBox: { background: "#1a0808", border: `1px solid #4a1a1a`, color: "#ff7b7b" },
  successBox: { background: "#0f2a0f", border: `1px solid #2a5c2a`, color: "#4caf50" },
  loader: {
    width: 16,
    height: 16,
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: `2px solid #fff`,
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
  },
};

const combineImages = async (files) => {
  if (files.length === 1) return files[0];

  return new Promise((resolve) => {
    const imgElements = [];
    let loaded = 0;

    files.forEach((file, index) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        imgElements[index] = { img, aspect: img.width / img.height };
        loaded++;
        if (loaded === files.length) {
          const targetWidth = 1200;
          const gap = 0;
          let targetHeight = 1200;

          const canvas = document.createElement("canvas");

          if (files.length === 3) {
            targetHeight = 1200;
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext("2d");

            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            imgElements.forEach((item, idx) => {
              if (!item) return;
              let cellX, cellY, cellW, cellH;
              if (idx === 0) {
                cellX = 0; cellY = 0;
                cellW = targetWidth / 2; cellH = targetHeight;
              } else if (idx === 1) {
                cellX = targetWidth / 2; cellY = 0;
                cellW = targetWidth / 2; cellH = targetHeight / 2;
              } else {
                cellX = targetWidth / 2; cellY = targetHeight / 2;
                cellW = targetWidth / 2; cellH = targetHeight / 2;
              }

              let sWidth = item.img.width;
              let sHeight = item.img.height;
              const cellAspect = cellW / cellH;

              if (item.aspect > cellAspect) {
                sWidth = sHeight * cellAspect;
              } else {
                sHeight = sWidth / cellAspect;
              }
              const sx = (item.img.width - sWidth) / 2;
              const sy = (item.img.height - sHeight) / 2;

              ctx.drawImage(item.img, sx, sy, sWidth, sHeight, cellX + gap, cellY + gap, cellW - gap * 2, cellH - gap * 2);
            });
          } else {
            const cols = files.length <= 4 ? 2 : 3;
            const rows = Math.ceil(files.length / cols);
            const cellWidth = targetWidth / cols;
            targetHeight = rows * cellWidth;

            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext("2d");

            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            imgElements.forEach((item, idx) => {
              if (!item) return;
              const x = (idx % cols) * cellWidth;
              const y = Math.floor(idx / cols) * cellWidth;

              let sWidth = item.img.width;
              let sHeight = item.img.height;
              if (item.aspect > 1) {
                sWidth = sHeight;
              } else {
                sHeight = sWidth;
              }
              const sx = (item.img.width - sWidth) / 2;
              const sy = (item.img.height - sHeight) / 2;

              ctx.drawImage(item.img, sx, sy, sWidth, sHeight, x + gap, y + gap, cellWidth - gap * 2, cellWidth - gap * 2);
            });
          }

          canvas.toBlob((blob) => {
            resolve(new File([blob], "collage.jpg", { type: "image/jpeg", lastModified: Date.now() }));
          }, "image/jpeg", 0.9);
        }
      };
    });
  });
};

export default function App() {
  const [imgFiles, setImgFiles] = useState([]);
  const [collagePreview, setCollagePreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [queue, setQueue] = useState([]);
  const [sendingProgress, setSendingProgress] = useState(null);

  const [captionTemplate, setCaptionTemplate] = useState(() =>
    localStorage.getItem("tg_captionTemplate") ?? "Price: $"
  );
  const [caption, setCaption] = useState(() =>
    localStorage.getItem("tg_captionTemplate") ?? "Price: $"
  );
  const [buttons, setButtons] = useState([
    { text: "🛒 Order here", url: "" },
    { text: "📍 Location", url: "https://maps.app.goo.gl/fkgwF1ecwueAm2DS6" }
  ]);

  const PRESET_PRICES = ["4.99", "5.99", "6.99", "7.50"];

  const [botToken, setBotToken] = useState(() => import.meta.env.VITE_BOT_TOKEN || localStorage.getItem("tg_botToken") || "");
  const [chatId, setChatId] = useState(() => import.meta.env.VITE_CHAT_ID || localStorage.getItem("tg_chatId") || "");
  const [orderContact, setOrderContact] = useState(() => import.meta.env.VITE_ORDER_CONTACT || localStorage.getItem("tg_orderContact") || "leapheaa28");
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const inputRef = useRef();

  useEffect(() => {
    // Auto open settings if no bot token to guide the user
    if (!botToken || !chatId) {
      setSettingsOpen(true);
    }
  }, [botToken, chatId]);

  useEffect(() => {
    let active = true;
    if (imgFiles.length > 0) {
      combineImages(imgFiles).then(file => {
        if (active) setCollagePreview(URL.createObjectURL(file));
      });
    } else {
      setCollagePreview(null);
    }
    return () => { active = false; };
  }, [imgFiles]);

  const saveSettings = (token, chat, contact) => {
    setBotToken(token);
    setChatId(chat);
    setOrderContact(contact);
    localStorage.setItem("tg_botToken", token);
    localStorage.setItem("tg_chatId", chat);
    localStorage.setItem("tg_orderContact", contact || "");
  };

  const updateTemplate = (val) => {
    setCaptionTemplate(val);
    localStorage.setItem("tg_captionTemplate", val);
  };

  const handleFiles = useCallback((files) => {
    if (!files || files.length === 0) return;
    const newFiles = Array.from(files).filter(f => f.type.startsWith("image/"));
    setImgFiles(prev => {
      const combined = [...prev, ...newFiles];
      return combined.slice(0, 10); // Telegram limit is 10 for MediaGroup
    });
    setError(null);
    setSuccess(null);
  }, []);

  const removeImage = (index) => {
    setImgFiles(prev => prev.filter((_, i) => i !== index));
  };

  const moveImageLeft = (index) => {
    if (index === 0) return;
    setImgFiles(prev => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const moveImageRight = (index) => {
    if (index === imgFiles.length - 1) return;
    setImgFiles(prev => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const handlePriceSelect = (priceText) => {
    if (caption.includes("$") && !caption.includes(`${priceText}$`)) {
      // Replace just the plain '$' or matching 'Price: $' format
      setCaption(caption.replace(/(Price:?\s*)\$/i, `$1${priceText}$`));
    } else if (!caption.includes(priceText)) {
      setCaption(`${caption.trim()}\n${priceText}$`);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const updateButton = (index, field, value) => {
    const newButtons = [...buttons];
    newButtons[index][field] = value;
    setButtons(newButtons);
  };

  const removeButton = (index) => {
    const newButtons = buttons.filter((_, i) => i !== index);
    setButtons(newButtons);
  };

  const addButton = () => {
    if (buttons.length >= 5) return; // Limit to 5 buttons max
    setButtons([...buttons, { text: "", url: "" }]);
  };

  const addToQueue = () => {
    if (imgFiles.length === 0) return setError("Please upload at least one image.");
    setQueue(prev => [...prev, { id: Date.now(), imgFiles, caption, buttons }]);

    // Reset form perfectly
    setImgFiles([]);
    setCollagePreview(null);
    setCaption(captionTemplate);
    setButtons([
      { text: "🛒 Order here", url: "" },
      { text: "📍 Location", url: "https://maps.app.goo.gl/fkgwF1ecwueAm2DS6" }
    ]);

    setSuccess(`Added to Queue! (${queue.length + 1} posts waiting)`);
    setTimeout(() => setSuccess(null), 3000);
  };

  const processQueue = async () => {
    // If we're currently building a post, add it to queue implicitly so it doesn't get left behind
    let currentQueue = [...queue];
    if (imgFiles.length > 0) {
      currentQueue.push({ id: Date.now(), imgFiles, caption, buttons });
      setImgFiles([]);
      setCollagePreview(null);
      setCaption(captionTemplate);
    }

    if (currentQueue.length === 0) return setError("Nothing to send. Upload an image first!");

    if (!botToken || !chatId) {
      setSettingsOpen(true);
      return setError("Please configure Bot Token and Chat ID in Settings.");
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    let count = 0;
    try {
      for (const post of currentQueue) {
        count++;
        setSendingProgress({ current: count, total: currentQueue.length });
        await sendPostData(post);
        // Small delay between posts to prevent Telegram rate limit issues (Flood control)
        await new Promise(res => setTimeout(res, 2000));
      }
      setQueue([]);
      setSuccess(`Successfully posted ${count} message${count > 1 ? 's' : ''} to channel!`);
    } catch (err) {
      setError(`Error sending post ${count}: ${err.message}`);
    } finally {
      setLoading(false);
      setSendingProgress(null);
    }
  };

  const sendPostData = async (postData) => {
    // Create collage if multiple images
    const finalImageToSend = await combineImages(postData.imgFiles);

    const formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append("photo", finalImageToSend);
    if (postData.caption.trim()) formData.append("caption", postData.caption);

    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!data.ok) {
      if (data.description === "Bad Request: chat not found" && chatId.startsWith("-") && !chatId.startsWith("-100")) {
        throw new Error(`Chat not found. Did you mean to use -100${chatId.substring(1)}?`);
      }
      throw new Error(data.description || "Failed to send photo");
    }

    const sentMsgId = data.result.message_id;
    const sentChat = data.result.chat;

    // Generate the post link
    const postLink = sentChat.username
      ? `https://t.me/${sentChat.username}/${sentMsgId}`
      : `https://t.me/c/${sentChat.id.toString().replace('-100', '')}/${sentMsgId}`;

    // Construct Order Message
    const shortCaption = postData.caption.length > 300 ? postData.caption.substring(0, 300) + "..." : postData.caption;
    const orderMsg = `🛒 Order Request:\n${shortCaption}\n🔗 Link: ${postLink}`;
    const encodedOrderMsg = encodeURIComponent(orderMsg);

    // Build inline keyboard, auto-filling empty URLs with deep links
    const flatButtons = [];
    postData.buttons.forEach(b => {
      if (!b.text.trim()) return;
      let finalUrl = b.url.trim();

      if (!finalUrl && orderContact) {
        const cleanContact = orderContact.replace('@', '');
        finalUrl = `https://t.me/${cleanContact}?text=${encodedOrderMsg}`;
      } else if (finalUrl.includes('t.me/')) {
        const separator = finalUrl.includes('?') ? '&' : '?';
        if (!finalUrl.includes('text=')) {
          finalUrl += `${separator}text=${encodedOrderMsg}`;
        }
      } else if (!finalUrl && !orderContact) {
        finalUrl = `https://t.me/share/url?url=${encodeURIComponent(postLink)}&text=${encodeURIComponent("🛒 Check this out: ")}`;
      }

      if (finalUrl) {
        flatButtons.push({ text: b.text.trim(), url: finalUrl });
      }
    });

    // Group buttons maximum 2 per row for side-by-side layout
    const inlineKeyboard = [];
    for (let i = 0; i < flatButtons.length; i += 2) {
      inlineKeyboard.push(flatButtons.slice(i, i + 2));
    }

    // Attach the buttons to the single collaged picture
    if (inlineKeyboard.length > 0) {
      const editRes = await fetch(`https://api.telegram.org/bot${botToken}/editMessageReplyMarkup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          message_id: sentMsgId,
          reply_markup: { inline_keyboard: inlineKeyboard }
        })
      });
      const editData = await editRes.json();
      if (!editData.ok) console.warn("Failed to attach inline keyboard:", editData);
    }
  };

  return (
    <div style={styles.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        input:focus { border-color: ${ACCENT} !important; }
        textarea:focus { outline: none; }
        button:active { transform: scale(0.98); }
        ::selection { background: #ff3b3b44; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0d0d0d; }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 3px; }
        .hover-btn:hover { color: #fff; border-color: #666 !important; }
      `}</style>

      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.logo}>
            LAPIN<span style={styles.logoAccent}>BOT</span>
          </span>
        </div>
        <button style={styles.settingsBtn} onClick={() => setSettingsOpen(!settingsOpen)}>
          ⚙️ Settings
        </button>
      </div>

      <div style={styles.main}>
        {/* Settings Panel */}
        {settingsOpen && (
          <div style={styles.settingsCard}>
            <div style={styles.settingsHeader}>Telegram Configuration</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={styles.label}>Bot Token</div>
              <input
                style={styles.input}
                placeholder="123456789:ABCdefGHIjklmNOPqrstUVWxyz"
                value={botToken}
                onChange={(e) => saveSettings(e.target.value, chatId, orderContact)}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={styles.label}>Channel / Chat ID</div>
              <input
                style={styles.input}
                placeholder="@yourchannel or -100123456789"
                value={chatId}
                onChange={(e) => saveSettings(botToken, e.target.value, orderContact)}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
              <div style={styles.label}>Order Contact (Admin Username)</div>
              <input
                style={styles.input}
                placeholder="e.g. your_store_admin"
                value={orderContact}
                onChange={(e) => saveSettings(botToken, chatId, e.target.value)}
              />
              <div style={{ fontSize: 11, color: '#666', marginTop: -2 }}>
                We use this to auto-generate the Pre-Order button link with text.
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
              <div style={styles.label}>Default Caption Template</div>
              <textarea
                style={{ ...styles.input, minHeight: 80, resize: "vertical" }}
                value={captionTemplate}
                onChange={(e) => updateTemplate(e.target.value)}
              />
              <div style={{ fontSize: 11, color: '#666', marginTop: -2 }}>
                This text will be loaded by default for new posts.
              </div>
            </div>
            <div style={{ fontSize: 11, color: '#666', marginTop: 4 }}>
              Make sure your bot is added as an admin in the target channel.
            </div>
          </div>
        )}

        {/* Upload zone */}
        {imgFiles.length === 0 ? (
          <div
            style={{ ...styles.uploadZone, ...(dragging ? styles.uploadZoneActive : {}) }}
            onClick={() => inputRef.current.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
          >
            <div style={styles.uploadIcon}>📸</div>
            <div style={styles.uploadText}>
              <span style={styles.uploadBold}>Drop product image(s) here</span>
              <br />or click to browse
              <br />
              <span style={{ fontSize: 11, color: "#444", marginTop: 6, display: "block" }}>
                Select multiple (up to 10 max)
              </span>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Live Collage Preview */}
            {collagePreview && (
              <div style={{ ...styles.previewWrap, ...styles.card, border: `2px solid ${BORDER}` }}>
                <img src={collagePreview} alt="Collage Preview" style={{ width: '100%', display: 'block' }} />
                <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.8)', padding: '4px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', color: ACCENT }}>
                  LIVE PREVIEW
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, maxWidth: '100%' }}>
              {imgFiles.map((file, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ position: 'relative', width: 100, height: 100, flexShrink: 0, borderRadius: 12, overflow: 'hidden', ...styles.card }}>
                    <img src={URL.createObjectURL(file)} alt={`Upload ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.8)', border: 'none', color: '#ff3b3b', borderRadius: '50%', width: 22, height: 22, cursor: 'pointer', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      onClick={() => removeImage(i)}
                      title="Remove Image"
                    >✕</button>
                    <div style={{ position: 'absolute', bottom: 4, left: 4, background: 'rgba(0,0,0,0.8)', color: '#fff', borderRadius: 4, padding: '2px 6px', fontSize: 9, fontWeight: 'bold' }}>
                      #{i + 1}
                    </div>
                  </div>

                  {imgFiles.length > 1 && (
                    <div style={{ display: 'flex', gap: 4, justifyContent: 'space-between', width: 100 }}>
                      <button
                        onClick={() => moveImageLeft(i)}
                        disabled={i === 0}
                        style={{ flex: 1, padding: "4px 0", background: "transparent", border: `1px solid ${BORDER}`, color: i === 0 ? "#333" : "#888", borderRadius: 4, cursor: i === 0 ? "default" : "pointer" }}>
                        ◀
                      </button>
                      <button
                        onClick={() => moveImageRight(i)}
                        disabled={i === imgFiles.length - 1}
                        style={{ flex: 1, padding: "4px 0", background: "transparent", border: `1px solid ${BORDER}`, color: i === imgFiles.length - 1 ? "#333" : "#888", borderRadius: 4, cursor: i === imgFiles.length - 1 ? "default" : "pointer" }}>
                        ▶
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {imgFiles.length > 0 && imgFiles.length < 10 && (
                <div
                  style={{ width: 100, height: 100, flexShrink: 0, borderRadius: 12, border: `2px dashed ${BORDER}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: CARD, color: '#888', transition: 'border-color 0.2s', ...styles.card }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = ACCENT}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = BORDER}
                  onClick={() => inputRef.current.click()}
                >
                  <div style={{ fontSize: 28, marginBottom: 4 }}>+</div>
                  <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Add More</div>
                </div>
              )}
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={(e) => { handleFiles(e.target.files); }}
              />
            </div>
          </div>
        )}

        {/* Editor Card */}
        <div style={{ ...styles.card, opacity: imgFiles.length > 0 ? 1 : 0.6, pointerEvents: imgFiles.length > 0 ? 'auto' : 'none' }}>
          {/* Caption */}
          <div style={styles.fieldRow}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <div style={styles.label}>Post Caption</div>
              <button
                style={{ ...styles.changeBtn, position: "static", background: "transparent", color: "#888", border: `1px solid ${BORDER}`, padding: "2px 8px", fontSize: 10 }}
                onClick={() => setCaption(captionTemplate)}
                title="Overwrite current text with the Default Template"
              >
                ↺ Reset to Template
              </button>
            </div>
            <textarea
              style={styles.textarea}
              placeholder="Write your pre-order description here..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            {/* Price Chip Row */}
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              <div style={{ fontSize: 10, color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', marginRight: 4 }}>
                Quick Price:
              </div>
              {PRESET_PRICES.map(price => (
                <button
                  key={price}
                  style={{
                    background: "transparent",
                    border: `1px solid ${BORDER}`,
                    color: "#fff",
                    padding: "4px 10px",
                    borderRadius: 12,
                    fontSize: 11,
                    cursor: "pointer",
                    transition: "border-color 0.2s, background 0.2s"
                  }}
                  onMouseOver={(e) => { e.target.style.borderColor = ACCENT; e.target.style.background = "#1a0a0a"; }}
                  onMouseOut={(e) => { e.target.style.borderColor = BORDER; e.target.style.background = "transparent"; }}
                  onClick={() => handlePriceSelect(price)}
                >
                  ${price}
                </button>
              ))}
            </div>
          </div>

          {/* Inline Buttons */}
          <div style={styles.fieldRow}>
            <div style={styles.label}>Telegram Inline Buttons</div>

            {buttons.map((btn, i) => (
              <div key={i} style={styles.buttonRow}>
                <input
                  style={{ ...styles.input, flex: 1 }}
                  placeholder="Button Text"
                  value={btn.text}
                  onChange={(e) => updateButton(i, "text", e.target.value)}
                />
                <input
                  style={{ ...styles.input, flex: 2 }}
                  placeholder="URL (leave blank to auto-generate from Contact)"
                  value={btn.url}
                  onChange={(e) => updateButton(i, "url", e.target.value)}
                />
                <button
                  style={styles.removeBtn}
                  onClick={() => removeButton(i)}
                  title="Remove Button"
                >
                  ✕
                </button>
              </div>
            ))}

            {buttons.length < 5 && (
              <button className="hover-btn" style={styles.addBtn} onClick={addButton}>
                + ADD BUTTON
              </button>
            )}
          </div>
        </div>

        {/* Status Messages */}
        {error && <div style={{ ...styles.statusBox, ...styles.errorBox }}>⚠️ {error}</div>}
        {success && <div style={{ ...styles.statusBox, ...styles.successBox }}>✅ {success}</div>}

        {/* Send Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {queue.length > 0 && (
            <div style={{ fontSize: 13, background: "#1a1a1a", border: `1px dashed ${BORDER}`, padding: "12px 16px", borderRadius: 8, color: "#aaa", textAlign: "center" }}>
              <strong style={{ color: "#fff", marginRight: 6 }}>{queue.length} Post{queue.length > 1 ? 's' : ''}</strong> currently queued and ready to send.
            </div>
          )}

          <div style={{ display: "flex", gap: 12 }}>
            <button
              style={{ ...styles.sendBtn, marginTop: 0, flex: 1, background: "transparent", border: `2px solid ${ACCENT}`, color: ACCENT, ...(loading || imgFiles.length === 0 ? styles.sendBtnDisabled : {}) }}
              onClick={addToQueue}
              disabled={loading || imgFiles.length === 0}
            >
              ➕ ADD TO QUEUE
            </button>
            <button
              style={{ ...styles.sendBtn, marginTop: 0, flex: 1.5, ...(loading || (imgFiles.length === 0 && queue.length === 0) ? styles.sendBtnDisabled : {}) }}
              onClick={processQueue}
              disabled={loading || (imgFiles.length === 0 && queue.length === 0)}
            >
              {loading && sendingProgress ? (
                <><div style={styles.loader} /> SENDING {sendingProgress.current} OF {sendingProgress.total}...</>
              ) : loading ? (
                <><div style={styles.loader} /> SENDING...</>
              ) : (
                `✈️ SEND ALL ${queue.length + (imgFiles.length > 0 ? 1 : 0)} POSTS`
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
