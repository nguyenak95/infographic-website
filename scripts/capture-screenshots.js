import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = '/Users/khangnguyen/.gemini/antigravity/brain/b7dc6461-95bc-4bbb-a8a8-0dfd3518f216/screenshots';
const PORT = 4321;
const URL = `http://localhost:${PORT}`;

// Ensure output directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('🤖 Starting Screenshot Capture Utility...');
  
  // 1. Start Astro preview server in the background
  console.log(`🚀 Spawning Astro preview server on port ${PORT}...`);
  const previewProcess = spawn('npm', ['run', 'preview', '--', '--port', PORT], {
    cwd: path.resolve(''),
    stdio: 'pipe',
    shell: true
  });

  let serverStarted = false;
  
  previewProcess.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(`[Astro Server]: ${output.trim()}`);
    if (output.includes('localhost:') || output.includes('http://')) {
      serverStarted = true;
    }
  });

  previewProcess.stderr.on('data', (data) => {
    console.error(`[Astro Server Error]: ${data.toString()}`);
  });

  // Wait for server to boot (max 10 seconds)
  let attempts = 0;
  while (!serverStarted && attempts < 20) {
    await sleep(500);
    attempts++;
  }

  if (!serverStarted) {
    console.log('⚠️ Astro server took too long to print URL, proceeding anyway...');
  }
  
  // Give it an extra second to compile/load
  await sleep(1500);

  console.log('🌐 Launching Playwright browser...');
  const browser = await chromium.launch({ headless: true });
  
  try {
    // -------------------------------------------------------------
    // DESKTOP SCREENSHOTS (1440x900)
    // -------------------------------------------------------------
    console.log('📸 Capturing Desktop views (1440x900)...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 }
    });
    const desktopPage = await desktopContext.newPage();
    
    // Visit home page
    await desktopPage.goto(URL);
    await sleep(2000); // Allow images and animations to resolve
    
    // Screenshot 1: Full Home Page
    await desktopPage.screenshot({
      path: path.join(SCREENSHOT_DIR, 'desktop_fullpage.png'),
      fullPage: true
    });
    console.log('✅ Captured desktop_fullpage.png');

    // Screenshot 2: Hero Section close-up
    await desktopPage.locator('section').first().screenshot({
      path: path.join(SCREENSHOT_DIR, 'desktop_hero.png')
    });
    console.log('✅ Captured desktop_hero.png');

    // Screenshot 3: Features Section close-up
    await desktopPage.locator('#features').screenshot({
      path: path.join(SCREENSHOT_DIR, 'desktop_features.png')
    });
    console.log('✅ Captured desktop_features.png');

    // Screenshot 4: Gallery with specs modal open
    console.log('👉 Triggering Details Modal...');
    // Scroll down to the gallery section
    await desktopPage.locator('#gallery').scrollIntoViewIfNeeded();
    await sleep(500);
    
    // Click on the first premium showcase item to open details modal
    // From GalleryView, inspect specs action: onSelectItem(item) or hover inspect specs button
    const inspectButton = desktopPage.locator('button:has-text("Inspect Specs"), button:has-text("Inspect Architecture")').first();
    if (await inspectButton.isVisible()) {
      await inspectButton.click();
      await sleep(1000); // Wait for modal animation
      
      await desktopPage.screenshot({
        path: path.join(SCREENSHOT_DIR, 'desktop_modal_open.png')
      });
      console.log('✅ Captured desktop_modal_open.png');
      
      // Close modal
      const closeButton = desktopPage.locator('button[title="Close Spec Window"], button:has-text("Close")').first();
      if (await closeButton.isVisible()) {
        await closeButton.click();
        await sleep(500);
      }
    } else {
      console.log('⚠️ Could not find "Inspect Specs" button on hover. Capturing gallery grid instead.');
      await desktopPage.locator('#gallery').screenshot({
        path: path.join(SCREENSHOT_DIR, 'desktop_gallery.png')
      });
    }

    // -------------------------------------------------------------
    // MOBILE SCREENSHOTS (iPhone 12: 390x844)
    // -------------------------------------------------------------
    console.log('📸 Capturing Mobile views (iPhone 12)...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(URL);
    await sleep(2000);

    // Screenshot 5: Mobile Hero view
    await mobilePage.screenshot({
      path: path.join(SCREENSHOT_DIR, 'mobile_hero.png')
    });
    console.log('✅ Captured mobile_hero.png');

    // Screenshot 6: Mobile Fullpage
    await mobilePage.screenshot({
      path: path.join(SCREENSHOT_DIR, 'mobile_fullpage.png'),
      fullPage: true
    });
    console.log('✅ Captured mobile_fullpage.png');

  } catch (error) {
    console.error('❌ Error during Playwright execution:', error);
  } finally {
    await browser.close();
    console.log('🛑 Killing Astro preview server process...');
    previewProcess.kill('SIGINT');
    console.log('🎉 Screenshot capture complete.');
    process.exit(0);
  }
}

main();
