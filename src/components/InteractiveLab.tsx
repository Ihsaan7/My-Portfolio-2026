import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RoleData } from '../types/portfolio';
import { Terminal, Activity, Send, Network, ShieldAlert, AlertTriangle, RotateCcw } from 'lucide-react';

interface InteractiveLabProps {
  role: RoleData;
}

export const InteractiveLab: React.FC<InteractiveLabProps> = ({ role }) => {
  // Backend Simulator State
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('/api/v1/books/search');
  const [apiLoading, setApiLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);

  // DevOps & Infra Simulator State
  const [selectedHost, setSelectedHost] = useState<string>('192.168.1.1 (Cisco Gateway)');
  const [pingRunning, setPingRunning] = useState(false);
  const [pingLogs, setPingLogs] = useState<string[]>([]);

  // Frontend Simulator State
  const [stiffness, setStiffness] = useState<number>(300);
  const [damping, setDamping] = useState<number>(20);
  const [mass, setMass] = useState<number>(1);
  const [animKey, setAnimKey] = useState<number>(0);

  // Security Simulator State (FYP: ML-Based Cyber Attack Detection)
  const [attackMode, setAttackMode] = useState<boolean>(false);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [securityStats, setSecurityStats] = useState({
    synPacketsReceived: 420,
    benignPackets: 418,
    attackPackets: 2,
    rfScore: 0.04,
    action: 'NORMAL (Legitimate Client Flow)',
    attackType: 'None',
  });

  const handleRunApiTest = () => {
    setApiLoading(true);
    setApiResponse(null);
    const start = performance.now();

    setTimeout(() => {
      const elapsed = Math.round(performance.now() - start + Math.random() * 6 + 6);
      if (selectedEndpoint === '/api/v1/books/search') {
        setApiResponse({
          status: 200,
          statusText: 'OK',
          latency: `${elapsed}ms`,
          headers: {
            'content-type': 'application/json',
            'x-powered-by': 'NestJS',
            'x-database': 'MongoDB Atlas',
            'x-ratelimit-remaining': '995/1000',
          },
          body: {
            success: true,
            count: 3,
            data: [
              { id: 'bv_01', title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', available: true },
              { id: 'bv_02', title: 'Clean Architecture', author: 'Robert C. Martin', available: true },
              { id: 'bv_03', title: 'Computer Networking: A Top-Down Approach', author: 'Kurose & Ross', available: false },
            ],
          },
        });
      } else if (selectedEndpoint === '/api/v1/auth/jwt-token') {
        setApiResponse({
          status: 200,
          statusText: 'OK',
          latency: `${elapsed}ms`,
          headers: {
            'content-type': 'application/json',
            'x-auth-scheme': 'Bearer RS256',
            'x-token-exp': '3600s',
          },
          body: {
            authenticated: true,
            user: 'Ihsaan Ullah',
            role: 'Software Engineer',
            permissions: ['READ:CATALOG', 'WRITE:BOOKS', 'ACCESS:API'],
          },
        });
      } else {
        setApiResponse({
          status: 201,
          statusText: 'Created',
          latency: `${elapsed + 10}ms`,
          headers: {
            'content-type': 'application/json',
            'x-database': 'PostgreSQL ACID',
          },
          body: {
            eventId: 'ev_8921',
            status: 'REGISTRATION_CONFIRMED',
            transactionTime: '2.1ms (PostgreSQL Transaction)',
          },
        });
      }
      setApiLoading(false);
    }, 250);
  };

  const handleRunPing = () => {
    setPingRunning(true);
    setPingLogs([`Initiating ICMP Echo Request to ${selectedHost}...`]);

    const delays = [1.1, 1.3, 0.8, 1.0];
    let step = 0;

    const interval = setInterval(() => {
      step++;
      if (step <= 4) {
        const ms = (delays[step - 1] + Math.random() * 0.3).toFixed(2);
        setPingLogs((prev) => [
          ...prev,
          `64 bytes from ${selectedHost.split(' ')[0]}: icmp_seq=${step} ttl=64 time=${ms} ms`,
        ]);
      } else {
        clearInterval(interval);
        setPingLogs((prev) => [
          ...prev,
          `--- ${selectedHost.split(' ')[0]} ping statistics ---`,
          `4 packets transmitted, 4 received, 0% packet loss, rtt min/avg/max = 0.8/1.05/1.3 ms`,
          `Link verified operational. Cisco CCNAv7 standard topology healthy.`,
        ]);
        setPingRunning(false);
      }
    }, 200);
  };

  const handleToggleAttack = () => {
    const nextState = !attackMode;
    setAttackMode(nextState);
    setAnalyzing(true);

    setTimeout(() => {
      if (nextState) {
        setSecurityStats({
          synPacketsReceived: 58400,
          benignPackets: 420,
          attackPackets: 57980,
          rfScore: 0.994,
          action: 'ALERT [MALICIOUS ATTACK DETECTED] -> Real-Time Alert to Admin Console',
          attackType: 'SYN Flood / Volumetric DoS (hping3 / slowloris)',
        });
      } else {
        setSecurityStats({
          synPacketsReceived: 420,
          benignPackets: 418,
          attackPackets: 2,
          rfScore: 0.04,
          action: 'NORMAL (Legitimate HTTP/SSH Client Flow)',
          attackType: 'None',
        });
      }
      setAnalyzing(false);
    }, 280);
  };

  return (
    <section id="lab" className="py-20 border-t border-zinc-200 dark:border-zinc-800 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: role.theme.accentHex }}
            />
            <span>Interactive Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Live Role Simulator
          </h2>
        </div>

        {/* Dynamic Simulator Window */}
        <div className="rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
          {/* Terminal styled header */}
          <div className="px-5 py-3 bg-zinc-100 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="ml-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>
                  {role.id === 'backend' && 'bookvault-api :: nestjs-endpoint-testbench'}
                  {role.id === 'it-support' && 'devops-infra :: cicd-network-shell'}
                  {role.id === 'frontend' && 'animebom-ui :: component-physics-calibrator'}
                  {role.id === 'software-security' && 'fyp-detection :: gns3-random-forest-detector'}
                </span>
              </span>
            </div>

            <div className="text-[11px] font-mono text-zinc-400 hidden sm:block">
              ENV: SANDBOX
            </div>
          </div>

          {/* Simulator Content */}
          <div className="p-6 sm:p-8">
            {/* 1. BACKEND SIMULATOR */}
            {role.id === 'backend' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-1">
                    BookVault NestJS & Express API Latency Testbench
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light">
                    Test live route dispatch, NestJS DTO validation, and MongoDB / PostgreSQL query resolution times.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { path: '/api/v1/books/search', label: 'BookVault Catalog (NestJS + MongoDB)' },
                    { path: '/api/v1/auth/jwt-token', label: 'JWT Authentication (Express + bcrypt)' },
                    { path: '/api/v1/events/register', label: 'EventPulse Ticket (PostgreSQL ACID)' },
                  ].map((ep) => (
                    <button
                      key={ep.path}
                      onClick={() => {
                        setSelectedEndpoint(ep.path);
                        setApiResponse(null);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedEndpoint === ep.path
                          ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 shadow-xs'
                          : 'bg-zinc-50/60 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800/80 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
                      }`}
                    >
                      <div className="text-xs font-mono font-semibold text-zinc-900 dark:text-white mb-0.5">
                        {ep.path}
                      </div>
                      <div className="text-[11px] text-zinc-500 font-sans">
                        {ep.label}
                      </div>
                    </button>
                  ))}
                </div>

                <div>
                  <button
                    onClick={handleRunApiTest}
                    disabled={apiLoading}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: role.theme.accentHex }}
                  >
                    {apiLoading ? (
                      <>
                        <Activity className="w-3.5 h-3.5 animate-spin" />
                        <span>Dispatching API Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Dispatch Request to Endpoint</span>
                      </>
                    )}
                  </button>
                </div>

                {apiResponse && (
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-mono text-xs space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800 text-[11px]">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        HTTP/2 {apiResponse.status} {apiResponse.statusText}
                      </span>
                      <span className="text-zinc-500">
                        Resolved: <strong className="text-zinc-800 dark:text-zinc-200">{apiResponse.latency}</strong>
                      </span>
                    </div>

                    <div>
                      <span className="text-zinc-500 block mb-1 text-[11px]">Response Headers:</span>
                      <pre className="text-[11px] text-zinc-700 dark:text-zinc-300 bg-white dark:bg-black/40 p-2.5 rounded-lg overflow-x-auto border border-zinc-200 dark:border-zinc-800">
                        {JSON.stringify(apiResponse.headers, null, 2)}
                      </pre>
                    </div>

                    <div>
                      <span className="text-zinc-500 block mb-1 text-[11px]">Response Payload:</span>
                      <pre className="text-[11px] text-emerald-700 dark:text-emerald-300 bg-white dark:bg-black/40 p-2.5 rounded-lg overflow-x-auto border border-zinc-200 dark:border-zinc-800">
                        {JSON.stringify(apiResponse.body, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. DEVOPS & INFRA SIMULATOR */}
            {role.id === 'it-support' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-1">
                    Cisco CCNAv7 Network Node Connectivity & Diagnostic Tool
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light">
                    Execute ICMP echo request diagnostics across enterprise gateways and DNS servers in simulated star topology.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {[
                    '192.168.1.1 (Cisco Gateway)',
                    '192.168.1.10 (Ubuntu Server)',
                    '8.8.8.8 (Google Primary DNS)',
                    '192.168.1.40 (Monitoring Node)',
                  ].map((host) => (
                    <button
                      key={host}
                      onClick={() => {
                        setSelectedHost(host);
                        setPingLogs([]);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedHost === host
                          ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 shadow-xs'
                          : 'bg-zinc-50/60 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800/80 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
                      }`}
                    >
                      <div className="text-xs font-mono font-medium text-zinc-900 dark:text-white truncate">
                        {host}
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleRunPing}
                  disabled={pingRunning}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: role.theme.accentHex }}
                >
                  <Network className="w-3.5 h-3.5" />
                  <span>{pingRunning ? 'Sending ICMP Packets...' : 'Execute ICMP Ping Test'}</span>
                </button>

                <div className="p-4 rounded-xl bg-zinc-900 text-sky-400 font-mono text-xs min-h-[140px] space-y-1">
                  {pingLogs.length === 0 ? (
                    <span className="text-zinc-500 block">
                      Target: {selectedHost}. Click "Execute ICMP Ping Test" to verify packet flow and latency.
                    </span>
                  ) : (
                    pingLogs.map((log, index) => (
                      <div key={index} className="leading-relaxed">
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* 3. FRONTEND SIMULATOR */}
            {role.id === 'frontend' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-1">
                    Fluid Motion & Spring Physics Calibrator
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light">
                    Adjust mechanical spring damping and stiffness values to observe 60fps micro-interaction curves used in AnimeBom and Soft UI.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="flex justify-between text-xs font-mono text-zinc-500 mb-2">
                      <span>Stiffness (k): {stiffness}</span>
                    </label>
                    <input
                      type="range"
                      min="80"
                      max="600"
                      value={stiffness}
                      onChange={(e) => setStiffness(Number(e.target.value))}
                      className="w-full accent-purple-600"
                    />
                  </div>

                  <div>
                    <label className="flex justify-between text-xs font-mono text-zinc-500 mb-2">
                      <span>Damping (c): {damping}</span>
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      value={damping}
                      onChange={(e) => setDamping(Number(e.target.value))}
                      className="w-full accent-purple-600"
                    />
                  </div>

                  <div>
                    <label className="flex justify-between text-xs font-mono text-zinc-500 mb-2">
                      <span>Mass (m): {mass}</span>
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="4"
                      step="0.1"
                      value={mass}
                      onChange={(e) => setMass(Number(e.target.value))}
                      className="w-full accent-purple-600"
                    />
                  </div>
                </div>

                {/* Physics Stage */}
                <div className="p-8 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center relative overflow-hidden min-h-[160px]">
                  <motion.div
                    key={`${animKey}-${stiffness}-${damping}-${mass}`}
                    initial={{ x: -140, rotate: -30, scale: 0.8 }}
                    animate={{ x: 0, rotate: 0, scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness,
                      damping,
                      mass,
                    }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-mono text-xs font-bold shadow-md cursor-pointer"
                    style={{ backgroundColor: role.theme.accentHex }}
                    onClick={() => setAnimKey((k) => k + 1)}
                  >
                    <span>60 FPS</span>
                  </motion.div>

                  <div className="mt-4 flex items-center gap-4 text-xs font-mono text-zinc-500">
                    <span>Click block to trigger impulse</span>
                    <button
                      onClick={() => setAnimKey((k) => k + 1)}
                      className="inline-flex items-center gap-1 text-zinc-900 dark:text-white hover:underline"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Re-trigger</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 4. SECURITY SIMULATOR (FYP ML Attack Detection) */}
            {role.id === 'software-security' && (
              <div className="space-y-6">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                      Final Year Project: ML-Based Cyber Attack Detector (GNS3 & Random Forest)
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      100% Client-Side Sandboxed Emulation (Zero External Packets · Safe)
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                    Browser visualization of the virtual star network topology from Ihsaan's BSSE Final Year Project: demonstrates how statistical packet flow features (TCP SYN rates, byte volume, inter-arrival delta) are evaluated by a trained Random Forest binary classifier in real time.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={handleToggleAttack}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white transition-all ${
                      attackMode ? 'bg-red-600 hover:bg-red-700' : 'hover:opacity-90'
                    }`}
                    style={{ backgroundColor: attackMode ? undefined : role.theme.accentHex }}
                  >
                    {attackMode ? (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Stop Kali Attack (Reset to Normal Traffic)</span>
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Launch Kali Attack (SYN Flood / DoS via hping3)</span>
                      </>
                    )}
                  </button>

                  <div className="text-xs font-mono text-zinc-500">
                    STATUS:{' '}
                    <strong className={attackMode ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}>
                      {attackMode ? 'MALICIOUS ATTACK IN PROGRESS' : 'NORMAL LEGITIMATE TRAFFIC'}
                    </strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">
                      Inbound Flow Rate
                    </div>
                    <div className="text-lg font-bold font-mono text-zinc-900 dark:text-white mt-0.5">
                      {securityStats.synPacketsReceived.toLocaleString()}/s
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">
                      Random Forest Anomaly
                    </div>
                    <div
                      className={`text-lg font-bold font-mono mt-0.5 ${
                        securityStats.rfScore > 0.5 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {(securityStats.rfScore * 100).toFixed(1)}%
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 col-span-2">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">
                      ML Classification Decision
                    </div>
                    <div className="text-xs font-mono text-zinc-900 dark:text-white mt-0.5 truncate font-semibold">
                      {securityStats.action}
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/60 border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-300">
                  <span className="text-zinc-500 block mb-1">Wireshark Feature Extraction Vector (GNS3 Star Topology):</span>
                  <div className="text-zinc-400 text-[11px] space-y-1">
                    <div>· Flow Duration & Byte Counts: {attackMode ? 'High-density short bursts (57,980 attack pkts)' : 'Standard TCP session stream'}</div>
                    <div>· TCP Flag Distribution: {attackMode ? 'SYN Flag = 99.1% (Volumetric half-open flood)' : 'SYN=1, ACK=1, FIN=1 (3-way handshake)'}</div>
                    <div>· Model: Random Forest Classifier (Supervised binary classification) on Monitoring Node (192.168.1.40)</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
