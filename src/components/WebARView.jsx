import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, CheckCircle, RefreshCw } from 'lucide-react';
import { InteractiveWidget } from './InteractiveDemos';

export function WebARView({ project, onClose }) {
  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [targetDetected, setTargetDetected] = useState(true);
  const [cameraError, setCameraError] = useState(false);

  useEffect(() => {
    // Attempt camera access for real WebAR simulation
    async function initCamera() {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setCameraActive(true);
          }
        }
      } catch (err) {
        // Fallback to simulated exhibition floor camera background
        setCameraError(true);
      }
    }

    initCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="ar-overlay-backdrop">
      <div className="ar-camera-viewport">
        {/* Real camera stream or simulated background */}
        {cameraActive ? (
          <video ref={videoRef} className="ar-video-feed" playsInline muted autoPlay />
        ) : (
          <div className="ar-simulated-feed">
            <div className="simulated-physical-board">
              <div className="simulated-board-poster">
                <h3>[PRINTED PHYSICAL SCIENCE POSTER]</h3>
                <p>{project.title}</p>
              </div>
            </div>
          </div>
        )}

        {/* AR HUD Scanning Frame */}
        <div className="ar-hud-overlay">
          <div className="ar-top-nav">
            <div className="ar-badge">
              <Camera size={14} />
              <span>WebAR Zero-Install Camera</span>
            </div>
            <button className="ar-close-btn" onClick={onClose}><X size={18} /></button>
          </div>

          {/* AR Target Reticle */}
          <div className={`ar-reticle ${targetDetected ? 'detected' : 'scanning'}`}>
            <div className="reticle-corner top-l" />
            <div className="reticle-corner top-r" />
            <div className="reticle-corner bot-l" />
            <div className="reticle-corner bot-r" />

            {/* Projected Holographic Widget floating directly on physical poster */}
            {targetDetected && (
              <div className="ar-hologram-card">
                <div className="hologram-header">
                  <CheckCircle size={14} color="#10B981" />
                  <span>Poster Matched: {project.title.split(':')[0]}</span>
                </div>
                <div className="hologram-content">
                  <InteractiveWidget type={project.demoType} />
                </div>
              </div>
            )}
          </div>

          <div className="ar-status-footer">
            <p>
              {targetDetected
                ? "✨ Physical board detected! Interactive AI model floating above poster."
                : "Point device camera at physical science fair trifold board..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
