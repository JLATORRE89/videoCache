import subprocess
import os
import sys
import pathlib
import shutil

def run_command(command):
    print(f"Running command: {command}")
    try:
        result = subprocess.run(command, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        print(result.stdout)
        if result.stderr:
            print(f"⚠️ stderr: {result.stderr}")
    except subprocess.CalledProcessError as e:
        if "no such container" in e.stderr.lower():
            print("⚡ Container not found. Skipping this step...")
        else:
            print(f"❌ Command error: {command}\n{e.stderr}")
            sys.exit(1)

def ensure_env_file():
    """Ensure that .env file exists by copying from .env.example if missing."""
    if not os.path.exists('.env'):
        if os.path.exists('.env.example'):
            shutil.copy('.env.example', '.env')
            print("✅ .env file created from .env.example.")
        else:
            print("❌ .env.example file is missing. Please provide it.")
            sys.exit(1)

def ensure_preview_script():
    """Ensure that the package.json has a preview script."""
    package_json_path = pathlib.Path("package.json")
    if package_json_path.exists():
        import json
        with open(package_json_path, "r+") as f:
            data = json.load(f)
            if "scripts" not in data:
                data["scripts"] = {}
            if "preview" not in data["scripts"]:
                data["scripts"]["preview"] = "vite preview --port 3001"
                f.seek(0)
                json.dump(data, f, indent=2)
                f.truncate()
                print("✅ Added missing 'preview' script to package.json.")


def main():
    if len(sys.argv) < 3:
        print("❌ Usage: python deploy_podman.py <username> <password>")
        sys.exit(1)

    username, password = sys.argv[1], sys.argv[2]
    project_path = pathlib.Path.cwd().as_posix()

    # ✅ Ensure .env file exists
    ensure_env_file()

    # ✅ Ensure preview script exists
    ensure_preview_script()

    # ✅ Stop and remove previous containers if they exist
    run_command("podman stop video-spa-container")
    run_command("podman rm video-spa-container")

    # ✅ Rebuild the container
    run_command("podman build -t video-spa-app -f Containerfile .")

    # ✅ Run the container with correct port mappings and volume mounts
    run_command(
        f"podman run -d --name video-spa-container -p 3001:3001 -p 5000:5000 "
        f"-v {project_path}/thumbnails:/app/thumbnails "
        f"-v {project_path}/.htpasswd:/etc/nginx/.htpasswd:Z "
        "localhost/video-spa-app:latest"
    )

    print("🚀 Deployment process completed successfully!")

if __name__ == "__main__":
    main()
