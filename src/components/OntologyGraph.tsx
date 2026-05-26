import React, { useEffect, useRef } from 'react';

const OntologyGraph: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const tooltip = tooltipRef.current;
    if (!canvas || !tooltip) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const nodes = [
      { id: 'doc', label: 'Document', x: 0.50, y: 0.46, r: 9, cat: 'core', desc: 'The active business object' },
      { id: 'data', label: 'Data', x: 0.50, y: 0.18, r: 6, cat: 'prop', desc: 'Structured extraction' },
      { id: 'evidence', label: 'Evidence', x: 0.73, y: 0.28, r: 6, cat: 'prop', desc: 'Verified proof' },
      { id: 'risk', label: 'Risk', x: 0.68, y: 0.66, r: 6, cat: 'prop', desc: 'Intelligence signals' },
      { id: 'workflow', label: 'Workflow', x: 0.32, y: 0.66, r: 6, cat: 'prop', desc: 'Automated actions' },
      { id: 'knowledge', label: 'Knowledge', x: 0.27, y: 0.28, r: 6, cat: 'prop', desc: 'Enterprise memory' },
      { id: 'vendor', label: 'Vendor', x: 0.15, y: 0.10, r: 3.5, cat: 'entity', desc: 'Supplier identity' },
      { id: 'amount', label: 'Amount', x: 0.38, y: 0.05, r: 3.5, cat: 'entity', desc: 'Financial value' },
      { id: 'date', label: 'Date', x: 0.62, y: 0.05, r: 3.5, cat: 'entity', desc: 'Temporal marker' },
      { id: 'taxid', label: 'Tax ID', x: 0.85, y: 0.10, r: 3.5, cat: 'entity', desc: 'Compliance identifier' },
      { id: 'transaction', label: 'Transaction', x: 0.92, y: 0.25, r: 3.5, cat: 'entity', desc: 'Financial event' },
      { id: 'fraud', label: 'Fraud', x: 0.94, y: 0.50, r: 3.5, cat: 'entity', desc: 'Anomaly signal' },
      { id: 'pii', label: 'PII', x: 0.90, y: 0.70, r: 3.5, cat: 'entity', desc: 'Sensitive data' },
      { id: 'duplicate', label: 'Duplicate', x: 0.78, y: 0.84, r: 3.5, cat: 'entity', desc: 'Redundancy signal' },
      { id: 'compliance', label: 'Compliance', x: 0.58, y: 0.92, r: 3.5, cat: 'entity', desc: 'Regulatory status' },
      { id: 'escalation', label: 'Escalation', x: 0.38, y: 0.92, r: 3.5, cat: 'entity', desc: 'Exception path' },
      { id: 'approval', label: 'Approval', x: 0.18, y: 0.84, r: 3.5, cat: 'entity', desc: 'Authorization gate' },
      { id: 'clause', label: 'Clause', x: 0.07, y: 0.62, r: 3.5, cat: 'entity', desc: 'Legal provision' },
      { id: 'policy', label: 'Policy', x: 0.06, y: 0.38, r: 3.5, cat: 'entity', desc: 'Governance rule' },
      { id: 'sop', label: 'SOPs', x: 0.10, y: 0.20, r: 3.5, cat: 'entity', desc: 'Process definition' },
      { id: 'contract', label: 'Contract', x: 0.28, y: 0.12, r: 3.5, cat: 'entity', desc: 'Binding agreement' },
    ];
    const edges = [
      { from: 'doc', to: 'data', label: 'contains' }, { from: 'doc', to: 'evidence', label: 'proves' }, { from: 'doc', to: 'risk', label: 'carries' },
      { from: 'doc', to: 'workflow', label: 'triggers' }, { from: 'doc', to: 'knowledge', label: 'feeds' },
      { from: 'data', to: 'amount' }, { from: 'data', to: 'date' }, { from: 'data', to: 'taxid' }, { from: 'data', to: 'vendor' },
      { from: 'evidence', to: 'transaction' }, { from: 'evidence', to: 'approval' }, { from: 'evidence', to: 'compliance' },
      { from: 'risk', to: 'fraud' }, { from: 'risk', to: 'pii' }, { from: 'risk', to: 'duplicate' },
      { from: 'workflow', to: 'escalation' }, { from: 'workflow', to: 'approval' },
      { from: 'knowledge', to: 'policy' }, { from: 'knowledge', to: 'clause' }, { from: 'knowledge', to: 'sop' }, { from: 'knowledge', to: 'contract' },
      { from: 'fraud', to: 'workflow', label: 'escalates' }, { from: 'compliance', to: 'risk', label: 'flags' },
      { from: 'transaction', to: 'data', label: 'yields' }, { from: 'vendor', to: 'contract', label: 'binds' },
      { from: 'duplicate', to: 'compliance', label: 'violates' },
    ];
    let particles: any[] = [];
    
    function initParticles() {
      particles = [];
      edges.forEach((_, i) => {
        for (let j = 0; j < 2; j++) {
          particles.push({ ei: i, p: Math.random(), s: 0.001 + Math.random() * 0.002, sz: 1 + Math.random() });
        }
      });
    }
    
    let W = 0, H = 0, mouseX = -1000, mouseY = -1000, time = 0;
    let hoveredNode: any = null;
    let animationFrameId: number;

    function resize() {
      if (!canvas || !ctx || !canvas.parentElement) return;
      const r = canvas.parentElement.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    
    function gp(n: any) { return { x: n.x * W, y: n.y * H }; }
    function gn(id: string) { return nodes.find(n => n.id === id); }
    function gc(id: string) {
      const s = new Set([id]);
      edges.forEach(e => {
        if (e.from === id) s.add(e.to);
        if (e.to === id) s.add(e.from);
      });
      return s;
    }
    
    function animate() {
      if (!ctx || !canvas || !tooltip) return;
      time++;
      ctx.clearRect(0, 0, W, H);
      hoveredNode = null;
      
      for (const n of nodes) {
        const p = gp(n);
        if (Math.hypot(mouseX - p.x, mouseY - p.y) < 20) {
          hoveredNode = n;
          break;
        }
      }
      
      const ci = hoveredNode ? gc(hoveredNode.id) : null;
      const sY = (time * 0.3) % H;
      const sg = ctx.createLinearGradient(0, sY - 20, 0, sY + 20);
      sg.addColorStop(0, 'rgba(34,197,94,0)');
      sg.addColorStop(0.5, 'rgba(34,197,94,0.03)');
      sg.addColorStop(1, 'rgba(34,197,94,0)');
      ctx.fillStyle = sg;
      ctx.fillRect(0, sY - 20, W, 40);
      
      edges.forEach(e => {
        const fromNode = gn(e.from);
        const toNode = gn(e.to);
        if (!fromNode || !toNode) return;
        
        const f = gp(fromNode);
        const t = gp(toNode);
        let a = 1;
        if (ci) {
          a = (ci.has(e.from) && ci.has(e.to)) ? 1.5 : 0.15;
        }
        ctx.beginPath();
        ctx.moveTo(f.x, f.y);
        ctx.lineTo(t.x, t.y);
        ctx.strokeStyle = `rgba(34,197,94,${0.08 * a})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        if (e.label && a > 0.5) {
          const mx = (f.x + t.x) / 2;
          const my = (f.y + t.y) / 2;
          ctx.font = '8px "JetBrains Mono"';
          ctx.fillStyle = `rgba(34,197,94,${0.25 * a})`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(e.label, mx, my - 6);
        }
      });
      
      particles.forEach(p => {
        p.p += p.s;
        if (p.p > 1) p.p = 0;
        const e = edges[p.ei];
        const fromNode = gn(e.from);
        const toNode = gn(e.to);
        if (!fromNode || !toNode) return;
        
        const f = gp(fromNode);
        const t = gp(toNode);
        ctx.beginPath();
        ctx.arc(f.x + (t.x - f.x) * p.p, f.y + (t.y - f.y) * p.p, Math.max(0.5, p.sz), 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34,197,94,0.4)';
        ctx.fill();
      });
      
      nodes.forEach(n => {
        const p = gp(n);
        let a = 1;
        if (ci) {
          a = ci.has(n.id) ? 1 : 0.15;
        }
        const pulse = n.cat === 'core' ? Math.sin(time * 0.02) * 1.5 : 0;
        const r = Math.max(0.5, n.r + pulse);
        if (n.cat !== 'entity') {
          const gr = r * (n.cat === 'core' ? 4 : 2.5);
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, gr);
          g.addColorStop(0, `rgba(34,197,94,${(n.cat === 'core' ? 0.15 : 0.08) * a})`);
          g.addColorStop(1, 'rgba(34,197,94,0)');
          ctx.beginPath();
          ctx.arc(p.x, p.y, gr, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = n.cat === 'core' ? `rgba(34,197,94,${0.9 * a})` : n.cat === 'prop' ? `rgba(74,222,128,${0.7 * a})` : `rgba(168,162,158,${0.5 * a})`;
        ctx.fill();
        if (n.cat === 'core') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r + 4, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(34,197,94,${0.2 * a})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.font = n.cat === 'core' ? '12px Geist' : n.cat === 'prop' ? '10px Geist' : '9px "JetBrains Mono"';
        ctx.fillStyle = n.cat === 'core' ? `rgba(255,255,255,${0.8 * a})` : `rgba(231,229,228,${n.cat === 'entity' ? 0.4 * a : 0.8 * a})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(n.label, p.x, p.y + r + 6);
      });
      
      if (hoveredNode) {
        tooltip.textContent = hoveredNode.desc;
        tooltip.style.left = (mouseX + 16) + 'px';
        tooltip.style.top = (mouseY - 10) + 'px';
        tooltip.classList.add('visible');
        canvas.style.cursor = 'pointer';
      } else {
        tooltip.classList.remove('visible');
        canvas.style.cursor = 'default';
      }
      
      animationFrameId = requestAnimationFrame(animate);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const r = canvas.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
    };
    const handleMouseLeave = () => { mouseX = -1000; mouseY = -1000; };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!canvas) return;
      const r = canvas.getBoundingClientRect();
      mouseX = e.touches[0].clientX - r.left;
      mouseY = e.touches[0].clientY - r.top;
    };
    const handleTouchEnd = () => { mouseX = -1000; mouseY = -1000; };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', resize);
    
    resize();
    initParticles();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="ontology-canvas" style={{ display: 'block', width: '100%', height: '100%' }} />
      <div ref={tooltipRef} className="ontology-tooltip" id="ontology-tooltip" />
    </>
  );
};

export default OntologyGraph;
