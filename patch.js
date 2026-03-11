// patch.js
const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

// 1. replace combineImages
const combineImagesReplacement = `const getFileId = (f) => f.name + '_' + f.lastModified + '_' + f.size;

const combineImages = async (files, transforms = {}) => {
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
    const cw = (e) => handleWheel(e);
    el.addEventListener('wheel', cw, { passive: false });
    return () => el.removeEventListener('wheel', cw);
  }, [handleWheel]);

  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startTx = transform.x || 0;
    const startTy = transform.y || 0;
    
    const onMouseMove = (moveE) => {
      const rect = cellRef.current.getBoundingClientRect();
      const dx = moveE.clientX - startX;
      const dy = moveE.clientY - startY;
      
      onChange({
        ...transform,
        x: startTx + (dx / rect.width),
        y: startTy + (dy / rect.height),
      });
    };
    
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  
  const tStr = \`translate(\${(transform.x || 0) * 100}%, \${(transform.y || 0) * 100}%) scale(\${transform.scale || 1})\`;
  const imgUrl = file instanceof File ? URL.createObjectURL(file) : file;

  return (
    <div 
      ref={cellRef}
      style={{
        ...style,
        position: 'relative',
        overflow: 'hidden',
        background: '#111',
        cursor: 'grab'
      }}
      onMouseDown={handleMouseDown}
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
};`;

content = content.replace(/const combineImages = async \(files\) => \{[\s\S]*?\}\s*\}\s*\}\);\s*\}\);\s*\}\;/m, combineImagesReplacement);

// 2. Add transforms state to App
content = content.replace(/const \[imgFiles, setImgFiles\] = useState\(\[\]\);/g, `const [imgFiles, setImgFiles] = useState([]);\n  const [transforms, setTransforms] = useState({});`);

// 3. remove collagePreview usage
content = content.replace(/const \[collagePreview, setCollagePreview\] = useState\(null\);\n/g, '');

content = content.replace(/  useEffect\(\(\) => \{\n    let active = true;\n    if \(imgFiles\.length > 0\) \{\n      combineImages\(imgFiles\)\.then\(file => \{\n        if \(active\) setCollagePreview\(URL\.createObjectURL\(file\)\);\n      \}\);\n    \} else \{\n      setCollagePreview\(null\);\n    \}\n    return \(\) => \{ active = false; \};\n  \}, \[imgFiles\]\);\n/m, '');

// 4. pass transforms to queue
content = content.replace(/setQueue\(prev => \[\.\.\.prev, \{ id: Date\.now\(\), imgFiles, caption, buttons \}\]\);/g, `setQueue(prev => [...prev, { id: Date.now(), imgFiles, transforms, caption, buttons }]);`);

content = content.replace(/currentQueue\.push\(\{ id: Date\.now\(\), imgFiles, caption, buttons \}\);/g, `currentQueue.push({ id: Date.now(), imgFiles, transforms, caption, buttons });`);

content = content.replace(/setImgFiles\(\[\]\);\n\s*setCollagePreview\(null\);/g, `setImgFiles([]);\n    setTransforms({});`);

content = content.replace(/const finalImageToSend = await combineImages\(postData\.imgFiles\);/g, `const finalImageToSend = await combineImages(postData.imgFiles, postData.transforms);`);

// 6. UI replacement
const uiReplace = `{/* Live Collage Preview */}
            {imgFiles.length === 1 && (
              <div style={{ ...styles.previewWrap, ...styles.card, border: \`2px solid \${BORDER}\` }}>
                <img src={URL.createObjectURL(imgFiles[0])} alt="Preview" style={{ width: '100%', maxHeight: 380, objectFit: 'contain', display: 'block' }} />
                <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.8)', padding: '4px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', color: ACCENT }}>
                  SINGLE IMAGE
                </div>
              </div>
            )}
            
            {imgFiles.length > 1 && (
              <div style={{ ...styles.card, padding: 10, display: 'flex', flexDirection: 'column', gap: 10, border: \`2px solid \${BORDER}\` }}>
                <div style={{ fontSize: 11, letterSpacing: '0.05em', color: '#888', textTransform: 'uppercase', textAlign: 'center', fontWeight: 'bold' }}>
                  Grid Preview (Drag to pan, Scroll to zoom)
                </div>
                <div style={{
                  display: 'grid',
                  gap: '2px',
                  background: BORDER,
                  border: \`2px solid \${BORDER}\`,
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
                    
                    let cellStyle = { backgroundColor: '#111' };
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
            )}`;

content = content.replace(/\{\/\* Live Collage Preview \*\/\}[\s\S]*?\}?\s*<\/div>\s*\)\}\s*<div style=\{\{ display: 'flex', gap: 12/m, uiReplace + "\n\n            <div style={{ display: 'flex', gap: 12");

fs.writeFileSync('src/App.jsx', content, 'utf8');
console.log('App.jsx patched successfully');
