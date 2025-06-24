# Portfolio Sharing Guide

This guide explains how to use the URL-based highlighting and sharing features in your portfolio.

## Features

### 1. Section Highlighting
Highlight entire sections (WordPress, Shopify, Wix, Webflow, etc.) with a special background color.

**URL Format:** `?section=sectionname`

**Examples:**
- `https://yoursite.com/?section=wordpress` - Highlights the WordPress section
- `https://yoursite.com/?section=shopify` - Highlights the Shopify section
- `https://yoursite.com/?section=wix` - Highlights the Wix section
- `https://yoursite.com/?section=webflow` - Highlights the Webflow section

### 2. Card Highlighting
Highlight specific project cards with an orange outline and background.

**URL Format:** `?id=cardid`

**Examples:**
- `https://yoursite.com/?id=wordpress-1` - Highlights a specific WordPress project
- `https://yoursite.com/?id=shopify-3,shopify-4` - Highlights multiple Shopify projects

### 3. Modal Popup with URL Support
Open a detailed modal for any project with comprehensive information. The modal can be opened directly via URL.

**URL Format:** `?modal=cardid`

**Examples:**
- `https://yoursite.com/?modal=wordpress-1` - Opens modal for WordPress project
- `https://yoursite.com/?modal=shopify-2` - Opens modal for Shopify project

**Modal Features:**
- Large project image with overlay
- Detailed project description
- Technologies used
- Key features list
- Development process
- Completion date
- Direct links to live demo and source code
- Responsive design for all devices
- Share button within the modal

### 4. Combined Highlighting
You can combine section and card highlighting, but the section parameter takes precedence for scrolling.

## How to Share

### For Sections:
1. Click the share icon (📤) in the top-right corner of any section header
2. The URL will be automatically copied to your clipboard
3. Share the URL with your client
4. When they visit the URL, the section will be highlighted and scrolled into view

### For Individual Cards (Highlight Only):
1. Hover over any project card
2. Click the share icon (📤) that appears in the top-right corner
3. The URL will be automatically copied to your clipboard
4. Share the URL with your client
5. When they visit the URL, the card will be highlighted and the section scrolled into view

### For Detailed Project View (Modal):
1. Click on any project card to open the detailed modal
2. Click the share icon (📤) in the top-right corner of the modal
3. The URL will be automatically copied to your clipboard
4. Share the URL with your client
5. When they visit the URL, the modal will automatically open with the project details

## Visual Indicators

### Section Highlighting:
- Orange background tint
- Orange border
- Automatic scrolling to the section

### Card Highlighting:
- Orange outline around the card
- Orange background tint on the card
- Automatic scrolling to the card's section

### Modal Features:
- Full-screen overlay with backdrop blur
- Large project image with gradient overlay
- Category badge in top-left corner
- Project title and description overlay
- Detailed content with scrollable area
- Action buttons for demo and source code
- Share button in top-right corner
- Keyboard navigation (Escape to close)

## Use Cases

### For Clients:
- **Show specific work:** Share a URL highlighting projects relevant to their industry
- **Compare options:** Share multiple highlighted cards to show different approaches
- **Focus attention:** Use section highlighting to direct attention to your strongest category
- **Detailed presentations:** Use modal URLs to show comprehensive project details
- **Direct project showcase:** Share modal URLs for specific projects they're interested in

### For Presentations:
- **Demo specific features:** Highlight cards that showcase particular technologies
- **Tell a story:** Use multiple highlights to walk through your development process
- **Showcase expertise:** Highlight sections that demonstrate your core competencies
- **Interactive demos:** Use modal URLs for detailed project walkthroughs
- **Professional sharing:** Share modal URLs that open directly to project details

## URL Examples

```
# Show WordPress expertise (section)
https://yoursite.com/?section=wordpress

# Show a specific e-commerce project (highlighted)
https://yoursite.com/?id=shopify-2

# Show a specific project with modal (detailed view)
https://yoursite.com/?modal=shopify-2

# Show multiple mobile apps (highlighted)
https://yoursite.com/?id=mobile-1,mobile-3,mobile-5

# Show frontend and backend work (highlighted)
https://yoursite.com/?id=frontend-1,backend-2
```

## Modal Interaction

### Opening Modals:
- Click on any project card
- Modal opens with smooth animation
- Background scroll is disabled
- URL updates to include modal parameter

### Modal Content:
- **Header:** Large project image with title overlay
- **Technologies:** All technologies used in the project
- **Project Overview:** Detailed description of the project
- **Key Features:** Bullet-point list of main features
- **Development Process:** Information about the development approach
- **Actions:** Buttons for live demo and source code
- **Share Button:** Copy modal URL to clipboard

### Closing Modals:
- Click the X button in the top-right corner
- Click outside the modal (backdrop)
- Press the Escape key
- Background scroll is re-enabled
- URL parameter is automatically removed

## URL Behavior

### When Sharing Modal URLs:
1. **Direct Access:** Clients can visit the URL and see the modal immediately
2. **Automatic Highlighting:** The card is also highlighted when modal opens
3. **Section Scrolling:** The page automatically scrolls to the correct section
4. **Clean URLs:** When modal is closed, the URL parameter is removed

### URL Parameters:
- `section=name` - Highlights entire section
- `id=cardid` - Highlights specific card(s)
- `modal=cardid` - Opens modal for specific card
- Multiple parameters can be combined

## Technical Notes

- URLs are automatically generated and copied to clipboard
- The system supports multiple card IDs separated by commas
- Section highlighting takes precedence for scrolling behavior
- All highlighting is temporary and doesn't affect the base portfolio
- URLs work on all devices and browsers
- Modals are fully responsive and accessible
- Keyboard navigation is supported for accessibility
- Modal content is scrollable for long project descriptions
- URL parameters are automatically managed (added/removed as needed)
- Modal URLs provide direct access to detailed project information 