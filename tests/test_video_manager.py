import sys
import re
import requests
from pytube import YouTube

BASE_URL = "http://localhost:3001/api/videos"


def log_success(message):
    print(f"✅ {message}")


def log_failure(message):
    print(f"❌ {message}")
    sys.exit(1)


def is_valid_youtube_url(url):
    """Validate if the provided URL is a valid YouTube URL."""
    pattern = r'(https?://)?(www\.)?(youtube\.com|youtu\.?be)/.+'
    return re.match(pattern, url) is not None


def fetch_youtube_metadata(url):
    """Fetch video metadata from YouTube using pytube."""
    try:
        yt = YouTube(url)
        return {
            "url": url,
            "title": yt.title,
            "description": yt.description,
            "thumbnail": f"https://img.youtube.com/vi/{yt.video_id}/hqdefault.jpg"
        }
    except Exception as e:
        log_failure(f"Failed to fetch YouTube metadata: {e}")


def test_api_connection():
    """Check if the API is available."""
    print("🔍 Testing API connectivity...")
    try:
        response = requests.get(BASE_URL)
        if response.status_code == 200:
            log_success("API is available.")
        else:
            log_failure(f"API responded with status code: {response.status_code}")
    except requests.ConnectionError:
        log_failure("API connection failed. Is the server running?")


def test_add_video(video_data):
    """Test adding a video to the backend."""
    print(f"➕ Adding video: {video_data['title']}")
    response = requests.post(BASE_URL, json=video_data)
    if response.status_code == 200:
        log_success("Video added successfully.")
        return response.json()
    else:
        log_failure(f"Failed to add video. Status code: {response.status_code}\n{response.text}")


def test_get_videos(expected_count=None):
    """Test retrieving all videos and optionally checking expected count."""
    print("📄 Retrieving all videos...")
    response = requests.get(BASE_URL)
    if response.status_code == 200:
        videos = response.json()
        log_success(f"Retrieved {len(videos)} videos.")
        if expected_count is not None and len(videos) != expected_count:
            log_failure(f"Expected {expected_count} videos but found {len(videos)}.")
        return videos
    else:
        log_failure(f"Failed to retrieve videos. Status code: {response.status_code}")


def test_delete_video(video_id):
    """Test deleting a video."""
    print(f"🗑️ Deleting video with ID: {video_id}")
    response = requests.delete(f"{BASE_URL}/{video_id}")
    if response.status_code == 204:
        log_success("Video deleted successfully.")
    else:
        log_failure(f"Failed to delete video. Status code: {response.status_code}")


def run_tests(youtube_url):
    """Run the full test suite for video management."""
    # Step 1: Check API
    test_api_connection()

    # Step 2: Get initial video count
    initial_videos = test_get_videos()
    initial_count = len(initial_videos)

    # Step 3: Add YouTube video
    video_data = fetch_youtube_metadata(youtube_url)
    added_video = test_add_video(video_data)

    # Step 4: Verify addition
    videos_after_add = test_get_videos(expected_count=initial_count + 1)
    if not any(video["id"] == added_video["id"] for video in videos_after_add):
        log_failure("Added video not found in video list.")
    else:
        log_success("Verified video addition.")

    # Step 5: Delete the video
    test_delete_video(added_video["id"])

    # Step 6: Verify deletion
    test_get_videos(expected_count=initial_count)

    print("\n🎉 All tests passed successfully!")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 test_video_manager.py <YouTube_URL>")
        sys.exit(1)

    youtube_url = sys.argv[1]

    if not is_valid_youtube_url(youtube_url):
        print(f"❌ Invalid YouTube URL: {youtube_url}")
        sys.exit(1)

    run_tests(youtube_url)
