{ pkgs, ... }: {
  # Use the desired Nix channel and package versions
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
  ];

  # Include any IDX extensions you need
  idx.extensions = [
    "svelte.svelte-vscode"
    "vue.volar"
  ];

  # Enable and configure previews
  idx.previews = {
    enable = true;  # Ensure previews are enabled
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "start"
          "--"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"   # Ensure app is accessible from outside localhost
          "--disable-host-check"
        ];
        env = {
          PORT = "$PORT";  # Set environment variable for port
        };
        manager = "web";  # Indicate the preview manager for web
      };
      # Optional: Configure Android previews if using Flutter
      android = {
        manager = "flutter";
      };
    };
  };
}
