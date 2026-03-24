import { useState, useRef, useCallback, useEffect } from "react";

const ACCENT = "#ffffff";
const DARK = "#111111";
const CARD = "#191919";
const BORDER = "#2b2b2b";
const TEXT_MAIN = "#efefef";
const TEXT_MUTED = "#888888";

const styles = {
  app: {
    minHeight: "100vh",
    background: DARK,
    color: TEXT_MAIN,
    fontFamily: "'Inter', sans-serif",
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
    background: CARD,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: "0.02em",
    color: TEXT_MAIN,
    fontFamily: "'Playfair Display', serif",
  },
  logoAccent: { color: TEXT_MUTED, fontWeight: 400 },
  badge: {
    background: "#2a2a2a",
    color: TEXT_MAIN,
    fontSize: 10,
    fontWeight: 600,
    padding: "2px 8px",
    borderRadius: 12,
    letterSpacing: "0.05em",
  },
  settingsBtn: {
    background: "transparent",
    border: `1px solid ${BORDER}`,
    color: TEXT_MAIN,
    borderRadius: 6,
    padding: "8px 14px",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
    transition: "background 0.2s"
  },
  main: {
    width: "100%",
    maxWidth: 680,
    padding: "40px 20px 80px",
    display: "flex",
    flexDirection: "column",
    gap: 28,
  },
  settingsCard: {
    background: CARD,
    border: `1px solid ${BORDER}`,
    borderRadius: 8,
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    boxShadow: "0 2px 10px rgba(0,0,0,0.5)"
  },
  settingsHeader: {
    fontSize: 13,
    fontWeight: 600,
    color: TEXT_MAIN,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: 8,
  },
  uploadZone: {
    border: `1px dashed #444`,
    borderRadius: 8,
    padding: "48px 20px",
    textAlign: "center",
    cursor: "pointer",
    transition: "border-color 0.2s, background 0.2s",
    background: CARD,
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 1px 4px rgba(0,0,0,0.3)"
  },
  uploadZoneActive: {
    borderColor: ACCENT,
    background: "#222222",
  },
  uploadIcon: { fontSize: 32, marginBottom: 12, opacity: 0.8 },
  uploadText: { fontSize: 14, color: TEXT_MUTED, lineHeight: 1.6 },
  uploadBold: { color: TEXT_MAIN, fontWeight: 600 },
  previewWrap: {
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
    background: CARD,
    border: `1px solid ${BORDER}`,
  },
  previewImg: {
    width: "100%",
    maxHeight: 380,
    objectFit: "contain",
    display: "block",
    background: "#111111",
  },
  changeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    background: CARD,
    border: `1px solid ${BORDER}`,
    color: TEXT_MAIN,
    fontSize: 11,
    padding: "6px 12px",
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: 500,
    boxShadow: "0 2px 4px rgba(0,0,0,0.4)"
  },
  card: {
    background: CARD,
    border: `1px solid ${BORDER}`,
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.4)"
  },
  cardHeader: {
    padding: "16px 20px",
    borderBottom: `1px solid ${BORDER}`,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.05em",
    color: TEXT_MAIN,
    textTransform: "uppercase",
  },
  fieldRow: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: "20px",
    borderBottom: `1px solid ${BORDER}`,
  },
  textarea: {
    background: "transparent",
    border: "none",
    color: TEXT_MAIN,
    fontSize: 15,
    lineHeight: 1.6,
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
    minHeight: 120,
    resize: "vertical",
  },
  label: { fontSize: 12, fontWeight: 600, color: TEXT_MUTED, textTransform: "uppercase", letterSpacing: "0.05em" },
  input: {
    background: "#1c1c1c",
    border: `1px solid ${BORDER}`,
    color: TEXT_MAIN,
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
    padding: "12px 14px",
    borderRadius: 6,
    transition: "border-color 0.2s"
  },
  buttonRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  removeBtn: {
    background: "transparent",
    border: `1px solid #3a1a1a`,
    color: "#fc8181",
    width: 42,
    height: 42,
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    fontSize: 18,
    transition: "background 0.2s"
  },
  addBtn: {
    background: "transparent",
    border: `1px dashed #444`,
    color: TEXT_MUTED,
    padding: "14px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    width: "100%",
    textAlign: "center",
    marginTop: 8,
    transition: "color 0.2s, border-color 0.2s, background 0.2s"
  },
  sendBtn: {
    background: ACCENT,
    color: "#000",
    border: "none",
    borderRadius: 6,
    padding: "16px 24px",
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: "0.02em",
    cursor: "pointer",
    width: "100%",
    transition: "opacity 0.2s, transform 0.1s, background 0.2s",
    marginTop: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    boxShadow: "0 4px 12px rgba(255,255,255,0.05)"
  },
  sendBtnDisabled: { opacity: 0.5, cursor: "not-allowed", boxShadow: "none" },
  statusBox: {
    padding: "16px",
    borderRadius: 6,
    fontSize: 14,
    marginTop: 16,
    textAlign: "center",
    fontWeight: 500
  },
  errorBox: { background: "#3a1a1a", border: `1px solid #5a2a2a`, color: "#fc8181" },
  successBox: { background: "#1a3a1a", border: `1px solid #2a5a2a`, color: "#68d391" },
  loader: {
    width: 18,
    height: 18,
    border: "2px solid rgba(0,0,0,0.1)",
    borderTop: `2px solid #000`,
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
  },
};

const getFileId = (f) => f.name + '_' + f.lastModified + '_' + f.size;

const combineImages = async (files, transforms = {}) => {
  if (files.length === 1) {
    const fid = getFileId(files[0]);
    const t = transforms[fid];
    // If transformed, we might want to also bake it. Wait, just let 1 image stay normal for now.
    return files[0];
  }

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

              const fid = getFileId(files[idx]);
              const t = transforms[fid] || { x: 0, y: 0, scale: 1 };
              
              const scaleToCover = Math.max(cellW / item.img.width, cellH / item.img.height);
              const drawScale = scaleToCover * (t.scale || 1);
              const drawW = item.img.width * drawScale;
              const drawH = item.img.height * drawScale;

              const centerX = cellX + gap + cellW / 2;
              const centerY = cellY + gap + cellH / 2;
              const panX = (t.x || 0) * cellW;
              const panY = (t.y || 0) * cellH;

              const drawX = centerX + panX - drawW / 2;
              const drawY = centerY + panY - drawH / 2;

              ctx.save();
              ctx.beginPath();
              ctx.rect(cellX + gap, cellY + gap, cellW - gap * 2, cellH - gap * 2);
              ctx.clip();
              ctx.drawImage(item.img, drawX, drawY, drawW, drawH);
              ctx.restore();
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
              const cellX = (idx % cols) * cellWidth;
              const cellY = Math.floor(idx / cols) * cellWidth;
              const cellW = cellWidth;
              const cellH = cellWidth;

              const fid = getFileId(files[idx]);
              const t = transforms[fid] || { x: 0, y: 0, scale: 1 };

              const scaleToCover = Math.max(cellW / item.img.width, cellH / item.img.height);
              const drawScale = scaleToCover * (t.scale || 1);
              const drawW = item.img.width * drawScale;
              const drawH = item.img.height * drawScale;

              const centerX = cellX + gap + cellW / 2;
              const centerY = cellY + gap + cellH / 2;
              const panX = (t.x || 0) * cellW;
              const panY = (t.y || 0) * cellH;

              const drawX = centerX + panX - drawW / 2;
              const drawY = centerY + panY - drawH / 2;

              ctx.save();
              ctx.beginPath();
              ctx.rect(cellX + gap, cellY + gap, cellW - gap * 2, cellH - gap * 2);
              ctx.clip();
              ctx.drawImage(item.img, drawX, drawY, drawW, drawH);
              ctx.restore();
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

const InteractiveCell = ({ file, transform, onChange, style }) => {
  const cellRef = useRef();
  const pinchStart = useRef({ dist: null, scale: null });
  
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const scaleDelta = e.deltaY > 0 ? -0.1 : 0.1;
    let newScale = (transform.scale || 1) + scaleDelta;
    newScale = Math.max(0.5, Math.min(newScale, 5));
    onChange({ ...transform, scale: newScale });
  }, [transform, onChange]);

  useEffect(() => {
    const el = cellRef.current;
    if (!el) return;

    const onTouchStart = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        pinchStart.current = {
          dist: Math.hypot(dx, dy),
          scale: transform.scale || 1
        };
      }
    };

    const onTouchMove = (e) => {
      if (e.touches.length === 2 && pinchStart.current.dist) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const scaleFactor = dist / pinchStart.current.dist;
        let newScale = pinchStart.current.scale * scaleFactor;
        newScale = Math.max(0.5, Math.min(newScale, 5));
        onChange({ ...transform, scale: newScale });
      }
    };

    const onTouchEnd = (e) => {
      if (e.touches.length < 2) {
        pinchStart.current = { dist: null, scale: null };
      }
    };

    const cw = (e) => handleWheel(e);
    el.addEventListener('wheel', cw, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('touchcancel', onTouchEnd);

    return () => {
      el.removeEventListener('wheel', cw);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [handleWheel, transform, onChange]);

  const handlePointerDown = (e) => {
    if (!e.isPrimary) return;
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startTx = transform.x || 0;
    const startTy = transform.y || 0;
    
    const onPointerMove = (moveE) => {
      if (pinchStart.current.dist) return; // skip panning if pinching
      
      const rect = cellRef.current.getBoundingClientRect();
      const dx = moveE.clientX - startX;
      const dy = moveE.clientY - startY;
      
      onChange({
        ...transform,
        x: startTx + (dx / rect.width),
        y: startTy + (dy / rect.height),
      });
    };
    
    const onPointerUp = () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('pointercancel', onPointerUp);
    };
    
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('pointercancel', onPointerUp);
  };
  
  const tStr = `translate(${(transform.x || 0) * 100}%, ${(transform.y || 0) * 100}%) scale(${transform.scale || 1})`;
  const imgUrl = file instanceof File ? URL.createObjectURL(file) : file;

  return (
    <div 
      ref={cellRef}
      style={{
        ...style,
        position: 'relative',
        overflow: 'hidden',
        background: '#111111',
        cursor: 'grab',
        touchAction: 'none'
      }}
      onPointerDown={handlePointerDown}
    >
      <img 
        src={imgUrl} 
        alt="cell"
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: tStr,
          pointerEvents: 'none',
          willChange: 'transform'
        }} 
      />
    </div>
  );
};

export default function App() {
  const [imgFiles, setImgFiles] = useState([]);
  const [transforms, setTransforms] = useState({});
  const [dragging, setDragging] = useState(false);
  const [queue, setQueue] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [sendingProgress, setSendingProgress] = useState(null);

  const [captionTemplate, setCaptionTemplate] = useState(() =>
    localStorage.getItem("tg_captionTemplate") ?? "Price: $"
  );
  const [caption, setCaption] = useState(() =>
    localStorage.getItem("tg_captionTemplate") ?? "Price: $"
  );
  const [buttons, setButtons] = useState([
    { text: "🛒 Order here", url: "" },
    { text: "📍 Location", url: "https://maps.app.goo.gl/w3X1KYZ7fNyWSJYs6" }
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
    
    if (editingId) {
      setQueue(prev => prev.map(q => q.id === editingId ? { ...q, imgFiles, transforms, caption, buttons } : q));
      setEditingId(null);
      setSuccess("Queue item updated!");
    } else {
      setQueue(prev => [...prev, { id: Date.now(), imgFiles, transforms, caption, buttons }]);
      setSuccess(`Added to Queue! (${queue.length + 1} posts waiting)`);
    }

    // Reset form perfectly
    setImgFiles([]);
    setTransforms({});
    setCaption(captionTemplate);
    setButtons([
      { text: "🛒 Order here", url: "" },
      { text: "📍 Location", url: "https://maps.app.goo.gl/w3X1KYZ7fNyWSJYs6" }
    ]);

    setTimeout(() => setSuccess(null), 3000);
  };

  const editQueueItem = (id) => {
    const item = queue.find(q => q.id === id);
    if (!item) return;

    setImgFiles(item.imgFiles || []);
    setTransforms(item.transforms || {});
    setCaption(item.caption || captionTemplate);
    setButtons(item.buttons || []);
    
    setEditingId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeQueueItem = (id) => {
    setQueue(prev => prev.filter(q => q.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setImgFiles([]);
      setTransforms({});
      setCaption(captionTemplate);
      setButtons([{ text: "🛒 Order here", url: "" }, { text: "📍 Location", url: "https://maps.app.goo.gl/w3X1KYZ7fNyWSJYs6" }]);
    }
  };

  const processQueue = async () => {
    // If we're currently building a post, add it to queue implicitly so it doesn't get left behind
    let currentQueue = [...queue];
    if (imgFiles.length > 0) {
      currentQueue.push({ id: Date.now(), imgFiles, transforms, caption, buttons });
      setImgFiles([]);
      setTransforms({});
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
    const finalImageToSend = await combineImages(postData.imgFiles, postData.transforms);

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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        input:focus { border-color: ${ACCENT} !important; }
        textarea:focus { outline: none; }
        button:active { transform: scale(0.98); }
        ::selection { background: #333333; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #111111; }
        ::-webkit-scrollbar-thumb { background: #333333; border-radius: 3px; }
        .hover-btn:hover { color: #fff; border-color: #666 !important; background: #222222; }
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
            <div style={{...styles.uploadIcon, color: TEXT_MAIN}}>⌘</div>
            <div style={styles.uploadText}>
              <span style={styles.uploadBold}>Drop order image(s) here</span>
              <br />or click to browse
              <br />
              <span style={{ fontSize: 11, color: TEXT_MUTED, marginTop: 6, display: "block" }}>
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
            {imgFiles.length === 1 && (
              <div style={{ ...styles.previewWrap, ...styles.card, border: `2px solid ${BORDER}` }}>
                <img src={URL.createObjectURL(imgFiles[0])} alt="Preview" style={{ width: '100%', maxHeight: 380, objectFit: 'contain', display: 'block', background: '#111111' }} />
                <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.8)', border: `1px solid ${BORDER}`, padding: '4px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', color: '#fff' }}>
                  SINGLE IMAGE
                </div>
              </div>
            )}
            
            {imgFiles.length > 1 && (
              <div style={{ ...styles.card, padding: 10, display: 'flex', flexDirection: 'column', gap: 10, border: `2px solid ${BORDER}` }}>
                <div style={{ fontSize: 11, letterSpacing: '0.05em', color: '#888', textTransform: 'uppercase', textAlign: 'center', fontWeight: 'bold' }}>
                  Grid Preview (Pan: Drag, Zoom: Scroll / Pinch)
                </div>
                <div style={{
                  display: 'grid',
                  gap: '2px',
                  background: BORDER,
                  border: `2px solid ${BORDER}`,
                  borderRadius: 8,
                  overflow: 'hidden',
                  gridTemplateColumns: imgFiles.length === 2 ? '1fr 1fr' : (imgFiles.length <= 4 ? '1fr 1fr' : 'repeat(3, 1fr)'),
                  gridTemplateRows: imgFiles.length === 3 ? '1fr 1fr' : 'auto',
                  aspectRatio: imgFiles.length === 3 || imgFiles.length === 4 ? '1' : 'auto'
                }}>
                  {imgFiles.map((file, i) => {
                    const fid = getFileId(file);
                    const t = transforms[fid] || { x: 0, y: 0, scale: 1 };
                    
                    const onChange = (newT) => {
                      setTransforms(prev => ({ ...prev, [fid]: newT }));
                    };
                    
                    let cellStyle = { backgroundColor: '#111111' };
                    if (imgFiles.length === 3 && i === 0) {
                      cellStyle.gridRow = 'span 2';
                      cellStyle.aspectRatio = '1 / 2';
                    } else if (imgFiles.length !== 3 && imgFiles.length !== 4) {
                      cellStyle.aspectRatio = '1 / 1';
                    }
                    if (imgFiles.length === 3 && i > 0) {
                       cellStyle.aspectRatio = '1 / 1';
                    }

                    return <InteractiveCell key={fid} file={file} transform={t} onChange={onChange} style={cellStyle} />;
                  })}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, maxWidth: '100%' }}>
              {imgFiles.map((file, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ position: 'relative', width: 100, height: 100, flexShrink: 0, borderRadius: 12, overflow: 'hidden', ...styles.card }}>
                    <img src={URL.createObjectURL(file)} alt={`Upload ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.8)', border: `1px solid ${BORDER}`, color: '#fff', borderRadius: '50%', width: 22, height: 22, cursor: 'pointer', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                      onClick={() => removeImage(i)}
                      title="Remove Image"
                    >✕</button>
                    <div style={{ position: 'absolute', bottom: 4, left: 4, background: 'rgba(0,0,0,0.8)', border: `1px solid ${BORDER}`, color: '#fff', borderRadius: 4, padding: '2px 6px', fontSize: 9, fontWeight: 'bold' }}>
                      #{i + 1}
                    </div>
                  </div>

                  {imgFiles.length > 1 && (
                    <div style={{ display: 'flex', gap: 4, justifyContent: 'space-between', width: 100 }}>
                      <button
                        onClick={() => moveImageLeft(i)}
                        disabled={i === 0}
                        style={{ flex: 1, padding: "4px 0", background: "transparent", border: `1px solid ${BORDER}`, color: i === 0 ? "#555" : "#fff", borderRadius: 4, cursor: i === 0 ? "default" : "pointer" }}>
                        ◀
                      </button>
                      <button
                        onClick={() => moveImageRight(i)}
                        disabled={i === imgFiles.length - 1}
                        style={{ flex: 1, padding: "4px 0", background: "transparent", border: `1px solid ${BORDER}`, color: i === imgFiles.length - 1 ? "#555" : "#fff", borderRadius: 4, cursor: i === imgFiles.length - 1 ? "default" : "pointer" }}>
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
            <div style={{ ...styles.card, padding: 16 }}>
              <div style={{...styles.cardHeader, padding: "0 0 12px 0", borderBottom: 'none'}}>
                Queue ({queue.length})
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {queue.map((q, idx) => (
                  <div key={q.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#1c1c1c", padding: "8px 12px", borderRadius: 6, border: `1px solid ${BORDER}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                      {q.imgFiles && q.imgFiles[0] && (
                        <div style={{ width: 32, height: 32, borderRadius: 4, overflow: "hidden", background: "#111111", flexShrink: 0 }}>
                           <img src={URL.createObjectURL(q.imgFiles[0])} alt="thumbnail" style={{width: '100%', height:'100%', objectFit: 'cover'}} />
                        </div>
                      )}
                      <span style={{ fontSize: 13, fontWeight: 500, color: editingId === q.id ? '#68d391' : TEXT_MAIN }}>
                        Post #{idx + 1} ({q.imgFiles ? q.imgFiles.length : 0} image{(q.imgFiles ? q.imgFiles.length : 0) !== 1 ? 's' : ''})
                        {editingId === q.id ? ' (Editing...)' : ''}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      <button style={{ ...styles.changeBtn, position: 'static', padding: "4px 10px", background: "transparent", color: TEXT_MAIN, boxShadow: 'none' }} onClick={() => editQueueItem(q.id)}>Edit</button>
                      <button style={{ ...styles.changeBtn, position: 'static', padding: "4px 10px", background: "transparent", color: "#fc8181", border: "1px solid #3a1a1a", boxShadow: 'none' }} onClick={() => removeQueueItem(q.id)}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 12 }}>
            <button
              style={{ ...styles.sendBtn, marginTop: 0, flex: 1, background: "transparent", border: `2px solid ${ACCENT}`, color: ACCENT, ...(loading || imgFiles.length === 0 ? styles.sendBtnDisabled : {}) }}
              onClick={addToQueue}
              disabled={loading || imgFiles.length === 0}
            >
              {editingId ? "💾 UPDATE QUEUE" : "➕ ADD TO QUEUE"}
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
