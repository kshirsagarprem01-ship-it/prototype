class DefenceCommPlatform {
    constructor() {
        this.currentUser = null;
        this.currentGroup = null;
        this.currentView = 'dashboard';
        this.vpnConnected = false;
        this.selectedServer = null;
        this.messages = [];
        this.typingUsers = new Set();
        this.securityLevel = 'RESTRICTED';
        
        // Load data from the provided JSON structure
        this.loadApplicationData();
        this.init();
    }

    loadApplicationData() {
        // User data
        this.users = [
            {
                "id": "DEF001",
                "name": "Major Rajesh Kumar",
                "rank": "Major",
                "role": "Personnel",
                "unit": "Indian Army - Northern Command",
                "clearance": "SECRET",
                "status": "Active",
                "photo": "👨‍✈️",
                "password": "def123"
            },
            {
                "id": "DEF002", 
                "name": "Squadron Leader Priya Singh",
                "rank": "Squadron Leader",
                "role": "Personnel",
                "unit": "Indian Air Force - Western Command",
                "clearance": "CONFIDENTIAL",
                "status": "Active",
                "photo": "👩‍✈️",
                "password": "def456"
            },
            {
                "id": "VET001",
                "name": "Col. (Retd) Vikram Sharma",
                "rank": "Colonel (Retd)",
                "role": "Veteran", 
                "unit": "Indian Navy - Retired",
                "clearance": "RESTRICTED",
                "status": "Active",
                "photo": "👨‍🦳",
                "password": "vet123"
            },
            {
                "id": "FAM001",
                "name": "Mrs. Sunita Kumar",
                "rank": "N/A",
                "role": "Family",
                "relation": "Spouse of DEF001",
                "clearance": "FAMILY",
                "status": "Active",
                "photo": "👩",
                "password": "fam123"
            },
            {
                "id": "HQ001",
                "name": "Brigadier Anil Chopra",
                "rank": "Brigadier",
                "role": "HQ Admin",
                "unit": "Defence HQ - Communications",
                "clearance": "TOP SECRET",
                "status": "Active",
                "photo": "👨‍💼",
                "password": "hq123"
            }
        ];

        // Groups data
        this.groups = [
            {
                "id": "GRP001",
                "name": "Northern Command Updates",
                "type": "Official",
                "members": ["DEF001", "DEF002", "HQ001"],
                "securityLevel": "SECRET",
                "status": "HQ Approved",
                "description": "Official updates and coordination",
                "icon": "🏛️",
                "lastActivity": "2025-09-30T16:30:00Z"
            },
            {
                "id": "GRP002", 
                "name": "Veterans Support Network",
                "type": "Community",
                "members": ["VET001", "DEF001", "FAM001"],
                "securityLevel": "RESTRICTED",
                "status": "HQ Approved",
                "description": "Support network for veterans and families",
                "icon": "🤝",
                "lastActivity": "2025-09-30T14:15:00Z"
            },
            {
                "id": "GRP003",
                "name": "Family Connect - Kumar Unit",
                "type": "Family",
                "members": ["DEF001", "FAM001"],
                "securityLevel": "FAMILY",
                "status": "HQ Approved", 
                "description": "Family communication channel",
                "icon": "👨‍👩‍👧‍👦",
                "lastActivity": "2025-09-30T16:45:00Z"
            }
        ];

        // Messages data
        this.messages = [
            {
                "id": "MSG001",
                "groupId": "GRP001",
                "senderId": "HQ001",
                "senderName": "Brigadier Anil Chopra",
                "content": "All personnel report security status by 1800 hrs. Encryption level: AES-256",
                "timestamp": "2025-09-30T14:30:00Z",
                "encrypted": true,
                "classification": "CONFIDENTIAL",
                "status": "read",
                "messageType": "text"
            },
            {
                "id": "MSG002",
                "groupId": "GRP002", 
                "senderId": "VET001",
                "senderName": "Col. (Retd) Vikram Sharma",
                "content": "Monthly veterans meetup scheduled for next weekend. Location TBD.",
                "timestamp": "2025-09-30T12:15:00Z",
                "encrypted": true,
                "classification": "RESTRICTED",
                "status": "delivered",
                "messageType": "text"
            },
            {
                "id": "MSG003",
                "groupId": "GRP003",
                "senderId": "DEF001", 
                "senderName": "Major Rajesh Kumar",
                "content": "Will be late for dinner tonight. Exercise extended till 2100 hrs.",
                "timestamp": "2025-09-30T16:45:00Z",
                "encrypted": true,
                "classification": "FAMILY",
                "status": "sent",
                "messageType": "text"
            }
        ];

        // VPN Servers
        this.vpnServers = [
            {
                "id": "IND-DEL-01",
                "name": "Delhi Secure Node",
                "location": "New Delhi, India",
                "status": "Active",
                "load": 23,
                "encryption": "AES-256",
                "protocol": "WireGuard",
                "latency": "12ms"
            },
            {
                "id": "IND-MUM-02", 
                "name": "Mumbai Defence Hub",
                "location": "Mumbai, India",
                "status": "Active", 
                "load": 45,
                "encryption": "AES-256",
                "protocol": "OpenVPN",
                "latency": "18ms"
            },
            {
                "id": "IND-BLR-03",
                "name": "Bangalore Command Center",
                "location": "Bangalore, India",
                "status": "Active",
                "load": 31,
                "encryption": "AES-256",
                "protocol": "WireGuard",
                "latency": "15ms"
            }
        ];

        // Security logs
        this.securityLogs = [
            {
                "id": "LOG001",
                "timestamp": "2025-09-30T16:50:00Z",
                "event": "Login Successful",
                "user": "DEF001",
                "details": "Multi-factor authentication completed",
                "severity": "info"
            },
            {
                "id": "LOG002",
                "timestamp": "2025-09-30T16:45:00Z",
                "event": "Message Sent",
                "user": "DEF001", 
                "details": "Encrypted message to GRP003",
                "severity": "info"
            },
            {
                "id": "LOG003",
                "timestamp": "2025-09-30T16:40:00Z",
                "event": "File Share Blocked",
                "user": "DEF002",
                "details": "Attempted external export prevented",
                "severity": "warning"
            },
            {
                "id": "LOG004",
                "timestamp": "2025-09-30T16:35:00Z",
                "event": "Screenshot Blocked",
                "user": "FAM001",
                "details": "Screenshot attempt detected and blocked",
                "severity": "warning"
            }
        ];
    }

    init() {
        this.setupEventListeners();
        this.setupSecurityFeatures();
        this.showScreen('login-screen');
        this.startSecurityMonitoring();
    }

    setupEventListeners() {
        // Login form
        document.getElementById('login-btn').addEventListener('click', () => this.handleLogin());
        document.getElementById('defence-id').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleLogin();
        });
        document.getElementById('password').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleLogin();
        });

        // MFA
        document.querySelector('#biometric-auth button').addEventListener('click', () => this.handleMFA());

        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchView(e.target.dataset.view));
        });

        // Header buttons
        document.getElementById('settings-btn').addEventListener('click', () => this.showSettings());
        document.getElementById('logout-btn').addEventListener('click', () => this.handleLogout());

        // Chat functionality
        document.getElementById('send-btn').addEventListener('click', () => this.sendMessage());
        document.getElementById('message-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        document.getElementById('message-input').addEventListener('input', () => this.handleTyping());

        // File upload
        document.getElementById('upload-btn').addEventListener('click', () => this.showUploadModal());
        document.getElementById('attach-btn').addEventListener('click', () => this.showUploadModal());

        // Modal controls
        document.getElementById('settings-close').addEventListener('click', () => this.hideModal('settings-modal'));
        document.getElementById('upload-close').addEventListener('click', () => this.hideModal('upload-modal'));
        document.getElementById('warning-ok').addEventListener('click', () => this.hideModal('security-warning-modal'));

        // Admin tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchAdminTab(e.target.dataset.tab));
        });
    }

    setupSecurityFeatures() {
        // Disable right-click context menu
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showSecurityWarning('Right-click context menu disabled for security');
        });

        // Disable specific keyboard shortcuts (more targeted approach)
        document.addEventListener('keydown', (e) => {
            // Only block specific dangerous shortcuts, not all keyboard input
            const isInputField = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA';
            
            // Don't interfere with normal typing in input fields
            if (isInputField) {
                // Only block copy/paste in input fields for security
                if (e.ctrlKey && (e.key === 'c' || e.key === 'v')) {
                    e.preventDefault();
                    this.showSecurityWarning('Copy/Paste disabled for security');
                    return;
                }
                // Allow all other keys in input fields
                return;
            }

            // For non-input areas, block more shortcuts
            if (e.ctrlKey && ['s', 'a', 'c', 'v'].includes(e.key.toLowerCase())) {
                e.preventDefault();
                this.showSecurityWarning('Action blocked for security');
            }
            
            // Disable F12 (dev tools), Ctrl+Shift+I, Ctrl+Shift+J
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && ['i', 'j'].includes(e.key.toLowerCase()))) {
                e.preventDefault();
                this.showSecurityWarning('Developer tools access blocked');
            }

            // Disable PrintScreen
            if (e.key === 'PrintScreen') {
                e.preventDefault();
                this.showSecurityWarning('Screenshot attempt blocked');
                this.logSecurityEvent('Screenshot Blocked', 'Screenshot attempt detected and blocked', 'warning');
            }
        });
    }

    startSecurityMonitoring() {
        // Simulate security monitoring
        setInterval(() => {
            this.updateSecurityStatus();
            this.checkSessionTimeout();
        }, 5000);
    }

    handleLogin() {
        const defenceId = document.getElementById('defence-id').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!defenceId || !password) {
            this.showSecurityWarning('Please enter both Defence ID and Password');
            return;
        }

        const user = this.users.find(u => u.id === defenceId && u.password === password);
        
        if (user) {
            this.currentUser = user;
            this.logSecurityEvent('Login Attempt', `Successful login for user ${defenceId}`, 'info');
            this.showScreen('mfa-screen');
            this.startMFAProcess();
        } else {
            this.logSecurityEvent('Login Failed', `Invalid credentials for ${defenceId}`, 'warning');
            this.showSecurityWarning('Invalid Defence ID or Password');
        }
    }

    startMFAProcess() {
        let progress = 0;
        const progressBar = document.getElementById('mfa-progress');
        const statusText = document.getElementById('mfa-status');
        
        statusText.textContent = 'Initializing biometric scanner...';
        
        const interval = setInterval(() => {
            progress += 2;
            progressBar.style.width = progress + '%';
            
            if (progress >= 100) {
                clearInterval(interval);
                statusText.textContent = 'Ready for biometric authentication';
            }
        }, 50);
    }

    handleMFA() {
        const progressBar = document.getElementById('mfa-progress');
        const statusText = document.getElementById('mfa-status');
        
        statusText.textContent = 'Scanning biometric data...';
        progressBar.style.width = '0%';
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            progressBar.style.width = progress + '%';
            
            if (progress >= 100) {
                clearInterval(interval);
                statusText.textContent = 'Biometric authentication successful!';
                this.logSecurityEvent('MFA Completed', 'Multi-factor authentication successful', 'info');
                setTimeout(() => {
                    this.showScreen('vpn-screen');
                    this.startVPNConnection();
                }, 1000);
            }
        }, 100);
    }

    startVPNConnection() {
        this.renderVPNServers();
        this.selectedServer = this.vpnServers[0]; // Auto-select Delhi server
        
        setTimeout(() => {
            this.connectToVPN();
        }, 2000);
    }

    renderVPNServers() {
        const serverList = document.getElementById('server-list');
        serverList.innerHTML = '';

        this.vpnServers.forEach(server => {
            const serverItem = document.createElement('div');
            serverItem.className = 'server-item';
            serverItem.innerHTML = `
                <div class="server-info">
                    <h4>${server.name}</h4>
                    <p>${server.location}</p>
                </div>
                <div class="server-metrics">
                    <span>Load: ${server.load}%</span>
                    <span>Latency: ${server.latency}</span>
                </div>
            `;
            
            serverItem.addEventListener('click', () => {
                document.querySelectorAll('.server-item').forEach(el => el.classList.remove('selected'));
                serverItem.classList.add('selected');
                this.selectedServer = server;
            });
            
            serverList.appendChild(serverItem);
        });

        // Auto-select first server
        document.querySelector('.server-item').classList.add('selected');
    }

    connectToVPN() {
        const statusText = document.getElementById('vpn-status-text');
        const connectionStatus = document.getElementById('connection-status');
        
        statusText.textContent = 'Establishing secure tunnel...';
        connectionStatus.textContent = 'Connecting...';
        
        setTimeout(() => {
            statusText.textContent = 'Authenticating with secure node...';
            setTimeout(() => {
                statusText.textContent = 'VPN Connection Established!';
                connectionStatus.textContent = 'Connected';
                connectionStatus.style.color = 'var(--color-success)';
                this.vpnConnected = true;
                
                setTimeout(() => {
                    this.showMainApplication();
                }, 1500);
            }, 1500);
        }, 1000);
    }

    showMainApplication() {
        this.showScreen('main-app');
        this.updateClassificationBanner();
        this.loadUserProfile();
        this.loadDashboard();
        this.setupChatInterface();
        
        // Show admin nav if user is HQ
        if (this.currentUser.role === 'HQ Admin') {
            document.getElementById('admin-nav').style.display = 'block';
        }
    }

    updateClassificationBanner() {
        const banner = document.getElementById('classification-banner');
        const text = document.getElementById('classification-text');
        
        text.textContent = this.currentUser.clearance;
        banner.classList.remove('hidden');
        
        // Adjust main app padding for banner
        document.getElementById('main-app').style.paddingTop = '40px';
    }

    loadUserProfile() {
        document.getElementById('user-photo').textContent = this.currentUser.photo;
        document.getElementById('user-name').textContent = this.currentUser.name;
        document.getElementById('user-rank').textContent = this.currentUser.rank;
        document.getElementById('user-unit').textContent = this.currentUser.unit;
        
        const clearanceBadge = document.getElementById('user-clearance');
        clearanceBadge.textContent = this.currentUser.clearance;
        clearanceBadge.setAttribute('data-level', this.currentUser.clearance);
        
        // Update VPN location in header
        if (this.selectedServer) {
            document.getElementById('vpn-location').textContent = this.selectedServer.location.split(',')[0];
        }
    }

    loadDashboard() {
        this.updateGroupStats();
        this.loadActivityFeed();
        this.loadSecurityAlerts();
    }

    updateGroupStats() {
        const userGroups = this.groups.filter(group => 
            group.members.includes(this.currentUser.id)
        );
        
        document.getElementById('group-count').textContent = userGroups.length;
        
        const totalMembers = new Set();
        userGroups.forEach(group => {
            group.members.forEach(member => totalMembers.add(member));
        });
        document.getElementById('member-count').textContent = totalMembers.size;
    }

    loadActivityFeed() {
        const activityFeed = document.getElementById('activity-feed');
        const recentLogs = this.securityLogs.slice(-3).reverse();
        
        activityFeed.innerHTML = recentLogs.map(log => `
            <div class="activity-item">
                <strong>${log.event}</strong><br>
                <small>${this.formatTime(log.timestamp)}</small><br>
                <span>${log.details}</span>
            </div>
        `).join('');
    }

    loadSecurityAlerts() {
        const alertList = document.getElementById('alert-list');
        const warningLogs = this.securityLogs.filter(log => log.severity === 'warning').slice(-2);
        
        alertList.innerHTML = warningLogs.map(log => `
            <div class="alert-item">
                <strong>⚠️ ${log.event}</strong><br>
                <small>${this.formatTime(log.timestamp)}</small><br>
                <span>${log.details}</span>
            </div>
        `).join('');
    }

    setupChatInterface() {
        this.loadGroupList();
    }

    loadGroupList() {
        const groupList = document.getElementById('group-list');
        const userGroups = this.groups.filter(group => 
            group.members.includes(this.currentUser.id)
        );
        
        groupList.innerHTML = userGroups.map(group => `
            <div class="group-item" data-group-id="${group.id}">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 1.2rem;">${group.icon}</span>
                    <div style="flex: 1;">
                        <h4>${group.name}</h4>
                        <p>${group.description}</p>
                        <div class="group-security">
                            <span class="security-badge">${group.securityLevel}</span>
                            <span style="font-size: 0.75rem; color: var(--color-text-secondary);">
                                ${this.formatTime(group.lastActivity)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add click listeners
        document.querySelectorAll('.group-item').forEach(item => {
            item.addEventListener('click', () => {
                const groupId = item.dataset.groupId;
                this.selectGroup(groupId);
            });
        });
    }

    selectGroup(groupId) {
        this.currentGroup = this.groups.find(g => g.id === groupId);
        
        // Update UI
        document.querySelectorAll('.group-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-group-id="${groupId}"]`).classList.add('active');
        
        // Load chat for this group
        this.loadGroupChat();
        
        // Show chat input
        document.getElementById('chat-input').style.display = 'block';
        document.getElementById('message-input').disabled = false;
    }

    loadGroupChat() {
        const chatHeader = document.getElementById('chat-header');
        const chatMessages = document.getElementById('chat-messages');
        
        chatHeader.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 1.5rem;">${this.currentGroup.icon}</span>
                <div>
                    <h3>${this.currentGroup.name}</h3>
                    <p style="margin: 0; color: var(--color-text-secondary); font-size: 0.9rem;">
                        ${this.currentGroup.members.length} members • ${this.currentGroup.securityLevel} • End-to-End Encrypted
                    </p>
                </div>
            </div>
        `;
        
        // Load messages for this group
        const groupMessages = this.messages.filter(msg => msg.groupId === this.currentGroup.id);
        
        chatMessages.innerHTML = groupMessages.map(msg => this.renderMessage(msg)).join('');
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    renderMessage(message) {
        const isSent = message.senderId === this.currentUser.id;
        const statusIcon = this.getMessageStatusIcon(message.status);
        
        return `
            <div class="message ${isSent ? 'sent' : 'received'}" data-message-id="${message.id}">
                <div class="message-header">
                    <span class="message-sender">${isSent ? 'You' : message.senderName}</span>
                    <span class="message-time">${this.formatTime(message.timestamp)}</span>
                </div>
                <div class="message-content">${message.content}</div>
                <div class="message-footer">
                    <div class="encryption-indicator">
                        <span>🔐</span>
                        <span>AES-256</span>
                        <span class="security-badge">${message.classification}</span>
                    </div>
                    <div class="message-status">
                        ${statusIcon}
                    </div>
                </div>
            </div>
        `;
    }

    getMessageStatusIcon(status) {
        switch (status) {
            case 'sent': return '✓';
            case 'delivered': return '✓✓';
            case 'read': return '✓✓✓';
            default: return '';
        }
    }

    handleTyping() {
        const input = document.getElementById('message-input');
        const charCounter = document.getElementById('char-counter');
        
        charCounter.textContent = `${input.value.length}/500`;
        
        if (input.value.length > 500) {
            input.value = input.value.substring(0, 500);
            this.showSecurityWarning('Message length limit reached (500 characters)');
        }
        
        // Show typing indicator simulation
        this.showTypingIndicator();
    }

    showTypingIndicator() {
        // Simulate other users seeing typing indicator
        if (this.currentGroup && Math.random() > 0.8) {
            const chatMessages = document.getElementById('chat-messages');
            const existingIndicator = chatMessages.querySelector('.typing-indicator');
            
            if (!existingIndicator) {
                const indicator = document.createElement('div');
                indicator.className = 'typing-indicator';
                indicator.innerHTML = `
                    <span>Someone is typing</span>
                    <div class="typing-dots">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                `;
                chatMessages.appendChild(indicator);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                setTimeout(() => {
                    if (indicator.parentNode) {
                        indicator.remove();
                    }
                }, 3000);
            }
        }
    }

    sendMessage() {
        const input = document.getElementById('message-input');
        const content = input.value.trim();
        
        if (!content || !this.currentGroup) return;
        
        // Create new message
        const message = {
            id: 'MSG' + Date.now(),
            groupId: this.currentGroup.id,
            senderId: this.currentUser.id,
            senderName: this.currentUser.name,
            content: content,
            timestamp: new Date().toISOString(),
            encrypted: true,
            classification: this.currentGroup.securityLevel,
            status: 'sent',
            messageType: 'text'
        };
        
        // Add encryption animation
        const sendBtn = document.getElementById('send-btn');
        sendBtn.classList.add('encrypting');
        sendBtn.disabled = true;
        sendBtn.textContent = '🔄 Encrypting...';
        
        setTimeout(() => {
            // Add message to array
            this.messages.push(message);
            
            // Update UI
            const chatMessages = document.getElementById('chat-messages');
            chatMessages.innerHTML += this.renderMessage(message);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Clear input
            input.value = '';
            document.getElementById('char-counter').textContent = '0/500';
            
            // Reset send button
            sendBtn.classList.remove('encrypting');
            sendBtn.disabled = false;
            sendBtn.textContent = '🔒 Send';
            
            // Log the event
            this.logSecurityEvent('Message Sent', `Encrypted message to ${this.currentGroup.name}`, 'info');
            
            // Simulate message delivery
            setTimeout(() => {
                message.status = 'delivered';
                this.updateMessageStatus(message.id, 'delivered');
            }, 1000);
            
            setTimeout(() => {
                message.status = 'read';
                this.updateMessageStatus(message.id, 'read');
            }, 3000);
            
        }, 1500);
    }

    updateMessageStatus(messageId, status) {
        const messageElement = document.querySelector(`[data-message-id="${messageId}"]`);
        if (messageElement) {
            const statusElement = messageElement.querySelector('.message-status');
            statusElement.innerHTML = this.getMessageStatusIcon(status);
        }
    }

    switchView(viewName) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${viewName}"]`).classList.add('active');
        
        // Update content
        document.querySelectorAll('.content-view').forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById(`${viewName}-view`).classList.add('active');
        
        this.currentView = viewName;
        
        // Load view-specific content
        switch (viewName) {
            case 'groups':
                this.loadGroupsView();
                break;
            case 'files':
                this.loadFilesView();
                break;
            case 'admin':
                this.loadAdminView();
                break;
        }
    }

    loadGroupsView() {
        const groupsGrid = document.getElementById('groups-grid');
        const userGroups = this.groups.filter(group => 
            group.members.includes(this.currentUser.id)
        );
        
        groupsGrid.innerHTML = userGroups.map(group => `
            <div class="group-card">
                <div class="group-header">
                    <div class="group-icon">${group.icon}</div>
                    <div class="group-details">
                        <h3>${group.name}</h3>
                        <p>${group.description}</p>
                    </div>
                </div>
                <div class="group-meta">
                    <span class="member-count">${group.members.length} members</span>
                    <span class="security-badge">${group.securityLevel}</span>
                </div>
                <div class="group-meta">
                    <span style="font-size: 0.8rem; color: var(--color-text-secondary);">
                        Status: ${group.status}
                    </span>
                    <span style="font-size: 0.8rem; color: var(--color-text-secondary);">
                        Updated: ${this.formatTime(group.lastActivity)}
                    </span>
                </div>
                <div class="group-actions">
                    <button class="btn btn--outline btn--sm" onclick="app.openGroupSettings('${group.id}')">
                        Settings
                    </button>
                    <button class="btn btn--primary btn--sm" onclick="app.openGroupChat('${group.id}')">
                        Open Chat
                    </button>
                </div>
            </div>
        `).join('');
        
        // Show create group button for HQ users
        if (this.currentUser.role === 'HQ Admin') {
            document.getElementById('create-group-btn').style.display = 'block';
        }
    }

    loadFilesView() {
        // Files view is already populated with sample data in HTML
        // In a real app, this would load user's accessible files
    }

    loadAdminView() {
        if (this.currentUser.role !== 'HQ Admin') {
            this.showSecurityWarning('Access denied. HQ Admin privileges required.');
            return;
        }
        
        this.loadUserManagement();
        this.loadSecurityAudit();
    }

    loadUserManagement() {
        const userManagement = document.getElementById('user-management');
        
        userManagement.innerHTML = this.users.map(user => `
            <div class="user-item">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 1.5rem;">${user.photo}</span>
                    <div>
                        <h4>${user.name}</h4>
                        <p>${user.rank} • ${user.unit}</p>
                        <span class="security-badge">${user.clearance}</span>
                        <span class="status ${user.status.toLowerCase()}">${user.status}</span>
                    </div>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button class="btn btn--outline btn--sm">Edit</button>
                    <button class="btn btn--outline btn--sm">Audit</button>
                </div>
            </div>
        `).join('');
    }

    loadSecurityAudit() {
        const securityAudit = document.getElementById('security-audit');
        
        securityAudit.innerHTML = `
            <div class="audit-log">
                <h4>Real-time Security Monitoring</h4>
                <div class="log-entries">
                    ${this.securityLogs.slice(-10).reverse().map(log => `
                        <div class="log-entry ${log.severity}">
                            <strong>${log.event}</strong> - ${log.user}<br>
                            <small>${this.formatTime(log.timestamp)}</small><br>
                            ${log.details}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    switchAdminTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`admin-${tabName}`).classList.add('active');
    }

    openGroupChat(groupId) {
        this.switchView('messages');
        setTimeout(() => {
            this.selectGroup(groupId);
        }, 100);
    }

    openGroupSettings(groupId) {
        this.showSecurityWarning('Group settings require HQ approval');
    }

    showSettings() {
        this.showModal('settings-modal');
        this.loadAuditLog();
    }

    loadAuditLog() {
        const logEntries = document.getElementById('log-entries');
        const userLogs = this.securityLogs.filter(log => log.user === this.currentUser.id);
        
        logEntries.innerHTML = userLogs.map(log => `
            <div class="log-entry ${log.severity}">
                <strong>${log.event}</strong><br>
                <small>${this.formatTime(log.timestamp)}</small><br>
                ${log.details}
            </div>
        `).join('');
    }

    showUploadModal() {
        this.showModal('upload-modal');
    }

    showModal(modalId) {
        document.getElementById(modalId).classList.remove('hidden');
    }

    hideModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
    }

    showSecurityWarning(message) {
        document.getElementById('warning-message').textContent = message;
        this.showModal('security-warning-modal');
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    handleLogout() {
        if (confirm('Are you sure you want to logout? This will end your secure session.')) {
            this.logSecurityEvent('Logout', 'User logged out successfully', 'info');
            this.currentUser = null;
            this.currentGroup = null;
            this.vpnConnected = false;
            
            // Clear sensitive data
            document.getElementById('defence-id').value = '';
            document.getElementById('password').value = '';
            
            // Hide classification banner
            document.getElementById('classification-banner').classList.add('hidden');
            
            this.showScreen('login-screen');
        }
    }

    updateSecurityStatus() {
        // Update security indicators
        const indicators = document.querySelectorAll('.status-indicator.secure');
        indicators.forEach(indicator => {
            if (this.vpnConnected) {
                indicator.style.background = 'var(--color-success)';
            }
        });
    }

    checkSessionTimeout() {
        // Simulate session timeout warning after extended inactivity
        // In a real app, this would track actual user activity
    }

    logSecurityEvent(event, details, severity = 'info') {
        const logEntry = {
            id: 'LOG' + Date.now(),
            timestamp: new Date().toISOString(),
            event: event,
            user: this.currentUser ? this.currentUser.id : 'SYSTEM',
            details: details,
            severity: severity
        };
        
        this.securityLogs.push(logEntry);
        
        // Update activity feed if dashboard is visible
        if (this.currentView === 'dashboard') {
            this.loadActivityFeed();
        }
        
        console.log(`[SECURITY LOG] ${event}: ${details}`);
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: 'short'
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new DefenceCommPlatform();
});

// Additional security measures
window.addEventListener('beforeunload', () => {
    // Log session end
    if (window.app && window.app.currentUser) {
        window.app.logSecurityEvent('Session End', 'User session ended', 'info');
    }
});

// Prevent drag and drop
document.addEventListener('dragover', (e) => e.preventDefault());
document.addEventListener('drop', (e) => {
    e.preventDefault();
    if (window.app) {
        window.app.showSecurityWarning('File drop disabled for security');
    }
});

// Blur window on focus loss (simulate screen lock)
let windowBlurred = false;
window.addEventListener('blur', () => {
    windowBlurred = true;
    document.body.style.filter = 'blur(5px)';
});

window.addEventListener('focus', () => {
    if (windowBlurred) {
        document.body.style.filter = 'none';
        windowBlurred = false;
    }
});
