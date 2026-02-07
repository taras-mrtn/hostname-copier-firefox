# Hostname Copier Changelog

## Version 0.5.0
• Fixed popup background flashing red (debug leftover)
• Removed overly broad `tabs` permission — only `activeTab` is used now
• Keyboard shortcut display now reflects user-customized bindings
• Improved dark theme detection (supports rgba and shorthand hex colors)
• Increased auto-close delay from 2s to 3s for easier verification
• Fixed deprecated API usage (`browser.runtime.getBackgroundPage`)
• Added safety guard for edge-case empty tab queries

## Version 0.4.0
• Added keyboard shortcut (Alt+Shift+H) for quicker hostname copying
• Implemented message passing architecture for popup/background communication
• Added keyboard shortcut display in popup
• Modernized JavaScript code with ES6+ features
• Enhanced error handling and reporting
• Added proper JSDoc comments for better code documentation
• Improved tab and URL validation

## Version 0.3.0
• Added Ukrainian (uk) language support
• Redesigned popup interface with larger hostname display
• Added auto-closing popup after successful copy (2 seconds)
• Removed duplicate hostname from success message
• Increased popup width for better readability
• Improved text formatting and spacing
• Added proper handling of long hostnames
• Updated both English and Ukrainian translations