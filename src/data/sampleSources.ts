import { MultimodalSource } from '../types';

export const SAMPLE_SOURCES: MultimodalSource[] = [
  {
    id: 'SRC-CYBERSENTINEL-01',
    title: 'Operation CyberSentinel: APT41 Supply Chain Breach Advisory',
    type: 'text',
    fileSize: '4.8 KB',
    timestamp: '2026-08-30T14:32:00Z',
    sha256Hash: 'a78df529c8e42103f69b1836014baef5d893192e4ab78912e54120caef8731b9',
    classificationLevel: 'TOP SECRET // NOFORN',
    extractedEntities: ['APT41', 'CVE-2026-4491', 'Supply Chain', 'DLL Sideloading', 'CERT-In', 'NTRO Sensor Net'],
    content: `NATIONAL TECHNICAL RESEARCH ORGANISATION (NTRO) - CYBER THREAT DIVISION
REPORT CLASSIFICATION: TOP SECRET // NOFORN
DATE: 30 AUGUST 2026

SUBJECT: DETECTION OF TARGETED SUPPLY CHAIN INTRUSION AGAINST DEFENSE TELEMETRY SUITE

1. EXECUTIVE SUMMARY:
NTRO passive sensors deployed at state border telemetry hubs identified active exploitation of a zero-day vulnerability (designated CVE-2026-4491) within standard communication controller firmware. The adversary, tracked as APT41 / Earth Baku variant, utilized weaponized DLL side-loading payloads disguised as standard firmware diagnostic routines.

2. TECHNICAL RECONNAISSANCE:
- Initial Access Vector: Compromise of an external tier-2 sensor maintenance repository.
- Persistence Mechanism: Windows registry key manipulation under HKLM\\SYSTEM\\CurrentControlSet\\Services\\NetTelemetrySensor.
- C2 Infrastructure: Encrypted outbound beaconing to IP 198.51.100.42 (Port 8443) and dynamic domain update-synch-gateway[.]org.
- Lateral Movement: Execution of living-off-the-land binaries (certutil.exe and PowerShell v5.1 bypass routines) targeting internal SCADA bridges.

3. IMPACT ASSESSMENT:
Potential risk of real-time GPS telemetry interception and disruption of early warning radar feeds. No data alteration has been confirmed in primary defense grids, but secondary telemetry caching buffers were temporarily compromised.

4. MANDATORY DEFENSIVE PROTOCOLS:
- Immediately isolate communication gateway subnet 10.140.0.0/16.
- Revoke all third-party firmware vendor signing certificates issued prior to 15 August 2026.
- Enforce strict SHA-256 hash validation on all gateway executable binaries and kernel drivers.
- Report all anomalies to the NTRO Joint Cyber Threat Coordination Center within 2 hours.`,
  },
  {
    id: 'SRC-QUANTUM-02',
    title: 'Quantum Key Distribution (QKD) Satellite Uplink Integrity Protocol',
    type: 'pdf',
    rawFileName: 'QKD_Satellite_Uplink_Integrity_v4.pdf',
    fileSize: '12.4 MB',
    timestamp: '2026-08-29T09:15:00Z',
    sha256Hash: '93c4e5108b3e51a70298f24ea1102830f5a90184b2c129e79430c5e182390abc',
    classificationLevel: 'SECRET',
    extractedEntities: ['QKD Protocol', 'BB84 Quantum State', 'ISRO Satellite Link', 'Decoy State Photons', 'Entropy Pool'],
    content: `TECHNICAL REPORT: SECURE QUANTUM COMMUNICATION UPLINK FOR STRATEGIC COMMAND
DEPARTMENT: QUANTUM TECHNOLOGIES RESEARCH WING, NTRO

OVERVIEW & ARCHITECTURAL SPECS:
This document standardizes the physical-layer quantum key distribution (QKD) protocol using entangled photon pairs (BB84 with decoy-state modulation) between high-altitude mobile ground stations and Low Earth Orbit (LEO) strategic satellites.

KEY PERFORMANCE BENCHMARKS:
- Secret Key Rate (SKR): 48.2 kbps under optimal atmospheric visibility (>15 km).
- Quantum Bit Error Rate (QBER): Baseline maintained below 2.4%, well beneath the theoretical eavesdropping threshold of 11%.
- Atmospheric Turbulence Compensation: Dynamic adaptive optics mirror array operating at 2.5 kHz refresh frequency.

SECURITY HIGHLIGHTS:
The continuous entropy pooling mechanism guarantees information-theoretic security against quantum computational decryption attacks (Shor's Algorithm and Grover's search algorithms).

DEPLOYMENT TIMELINE:
- Ground station calibration complete in Ladakh and Andaman observatories.
- Full operational link integration scheduled for Q4 2026.`,
  },
  {
    id: 'SRC-GRID-03',
    title: 'Critical Power Grid SCADA ICS Vulnerability & Ransomware Defense',
    type: 'audio',
    rawFileName: 'Scada_Grid_Incident_Debrief_Audio.mp3',
    fileSize: '28.1 MB',
    timestamp: '2026-08-28T16:40:00Z',
    sha256Hash: '5e7912a4b80c3e981df3324089901ef2b1928038148b88301c2384f5012498ab',
    classificationLevel: 'CONFIDENTIAL',
    extractedEntities: ['National Power Grid', 'Modbus TCP', 'Substation 4B', 'Ransomware Strain DarkVolt', 'Air-gap Isolation'],
    content: `TRANSCRIPTION OF AUDIO DEBRIEF // REGIONAL LOAD DESPATCH AUDIT:
"This is the Incident Commander recording at 16:40 hours. At approximately 14:15 IST, automated anomaly detection flags triggered across Northern Regional Load Despatch Centre Substation 4B. Modbus TCP protocol traffic exhibited unprecedented bursts exceeding 4,000 requests per second.

Forensic examination revealed an automated ransomware payload attempting to overwrite programmable logic controller (PLC) setpoints for substation voltage transformers. Immediate manual air-gap isolation protocols were activated within 8 minutes of telemetry anomaly detection. 

No blackout or transformer damage occurred. We have isolated the malicious payload signature and extracted three command IP addresses operating from dynamic proxies. All supervisory control networks have been migrated to the offline reserve fiber loop."`,
  },
  {
    id: 'SRC-DRONE-04',
    title: 'Autonomous Border Drone Fleet Telemetry & Electronic Warfare Report',
    type: 'image',
    rawFileName: 'Border_EW_Spectrogram_Capture.png',
    fileSize: '6.2 MB',
    timestamp: '2026-08-27T22:10:00Z',
    sha256Hash: '1c0984ba45e12891cf32490184b238ef12847290184c281048b2918301948210',
    classificationLevel: 'SECRET',
    extractedEntities: ['UAV Swarm Net', 'GPS Spoofing', 'GNSS L1/L2 Jamming', 'Frequency Hopping', 'Sector 9 Western Perimeter'],
    content: `IMAGE OCR TELEMETRY BREAKDOWN // MULTI-SPECTRAL DRONE SURVEILLANCE:
Spectrogram telemetry analysis from Sector 9 Western Perimeter indicates high-power directional radio-frequency jamming targeting GNSS L1 and L2 frequencies (1575.42 MHz and 1227.60 MHz). 

Autonomous drone flight controllers seamlessly engaged inertial navigation system (INS) fallback and switched communication to encrypted ultra-wideband frequency-hopping spread-spectrum (FHSS) channels operating at 400 hops/second.

Surveillance imagery confirmed hostile mobile electronic warfare vehicle stationed 14.2 km west of border marker 108. Counter-jamming triangulation coordinates dispatched to regional command units.`,
  },
];
