### 📄 **README.md for `test_video_manager.py`**  

This `README.md` provides complete instructions for setting up, running, and understanding the test script for your **Video Manager** application. The script tests API endpoints by adding, retrieving, and deleting a YouTube video.

---

## 🎬 **Video Manager API Test Script**

This Python test script (`test_video_manager.py`) verifies the core functionalities of the **Video Manager** web application by:

- ✅ Checking API availability.  
- 🎥 Adding a **YouTube video** and fetching its metadata.  
- 📄 Verifying that the video was successfully added.  
- 🗑️ Deleting the video.  
- 🔄 Confirming successful deletion.

---

## ⚡ **Prerequisites**

- Python **3.7+** installed on your system.
- **Podman** running the Video Manager app at:  
  ```
  http://localhost:3001/api/videos
  ```
- Internet access (for fetching YouTube metadata using `pytube`).

---

## 🏗️ **Setup Instructions**

### 1️⃣ **Clone or Copy the Files**

Ensure the following files are in your project directory:

```
/video-manager-tests
│
├── test_video_manager.py           # Python test script
└── test-requirements.txt           # Required Python dependencies
```

---

### 2️⃣ **Create a Virtual Environment** (Recommended)

Create and activate a **virtual environment** to isolate dependencies:

```bash
# Create the environment
python3 -m venv venv

# Activate the environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate
```

---

### 3️⃣ **Install Dependencies**

Install required Python packages:

```bash
pip install -r test-requirements.txt
```

**Contents of `test-requirements.txt`:**
```plaintext
pytube==15.0.0
requests==2.31.0
```

---

## 🚀 **Running the Test Script**

Run the script with a **YouTube URL** as an argument:

```bash
python3 test_video_manager.py https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

---

### 🌟 **Sample Output**

```
🔍 Testing API connectivity...
✅ API is available.

📄 Retrieving all videos...
✅ Retrieved 0 videos.

➕ Adding video: Rick Astley - Never Gonna Give You Up (Official Music Video)
✅ Video added successfully.

📄 Retrieving all videos...
✅ Retrieved 1 videos.
✅ Verified video addition.

🗑️ Deleting video with ID: 1
✅ Video deleted successfully.

📄 Retrieving all videos...
✅ Retrieved 0 videos.

🎉 All tests passed successfully!
```

---

## 🎯 **What the Script Tests**

1. **API Connectivity:** Checks if `/api/videos` responds.
2. **Add Video:** Adds a YouTube video, fetching:
   - ✅ Title  
   - ✅ Description  
   - ✅ Thumbnail URL
3. **Verify Addition:** Confirms the video is added successfully.
4. **Delete Video:** Deletes the video using its ID.
5. **Confirm Deletion:** Verifies the video is removed.

---

## 🔄 **Additional Commands**

### 💡 **Deactivate Virtual Environment**  
After testing:
```bash
deactivate
```

---

## ⚡ **Troubleshooting**

- **❌ Connection Errors:**  
  - Ensure your backend server is running on port `3001`.  
  - Check Podman container status:
    ```bash
    podman ps -a
    ```

- **❌ `pytube` Issues:**  
  - Ensure network connectivity for fetching YouTube metadata.
  - Upgrade `pytube` if necessary:
    ```bash
    pip install --upgrade pytube
    ```

- **❌ Invalid YouTube URL:**  
  - The script only accepts valid YouTube URLs in the following formats:  
    ```
    https://www.youtube.com/watch?v=VIDEO_ID
    https://youtu.be/VIDEO_ID
    ```

---

## 🤝 **Contributing**

If you’d like to improve the test coverage or add new features:

1. **Fork** this repository.  
2. **Create a new branch** (`git checkout -b feature-name`).  
3. **Commit** your changes (`git commit -am 'Add new feature'`).  
4. **Push** to the branch (`git push origin feature-name`).  
5. **Open a Pull Request** and describe your changes.  

---

## 📜 **License**

This project is licensed under the [MIT License](LICENSE).

---

## 💬 **Feedback & Support**

For feedback, suggestions, or questions, feel free to reach out.  
Happy testing! 🚀✨

---

💡 **This `README.md` provides everything from setup to execution details for seamless testing of your Video Manager API.**