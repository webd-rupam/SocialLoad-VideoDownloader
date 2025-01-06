import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { videoUrl } = await req.json();

  if (!videoUrl) {
    return NextResponse.json({ error: 'Video URL is required' }, { status: 400 });
  }

  try {
    // Define public folder output directory
    const publicDir = path.join(process.cwd(), 'public', 'downloads');

    // Ensure the 'downloads' directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Temporary filename for output
    const sanitizedTitle = `download_${Date.now()}.mp4`; // Generate a safe filename
    const output = path.join(publicDir, sanitizedTitle);

    console.log('Output Path:', output); // Debugging Log

    return await new Promise((resolve, reject) => {
      // yt-dlp command with sanitized filename
      const command = `D:\\Downloads\\yt-dlp.exe -f best -o "${output}" "${videoUrl}"`;

      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.error('Error downloading video:', err.message || stderr);
          return reject(
            NextResponse.json({ error: 'Failed to download video.' }, { status: 500 })
          );
        }

        console.log('yt-dlp stdout:', stdout); // Debugging Log

        // Provide the sanitized filename directly
        const videoFileUrl = `/downloads/${encodeURIComponent(sanitizedTitle)}`;

        // Resolve with the download link
        resolve(
          NextResponse.json({ downloadLink: videoFileUrl }, { status: 200 })
        );
      });
    });
  } catch (error) {
    console.error('Error processing video:', error);
    return NextResponse.json(
      { error: 'Failed to process video download.' },
      { status: 500 }
    );
  }
}
