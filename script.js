const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000010);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.set(0, 40, 120);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
const labelRenderer = new THREE.CSS2DRenderer();

labelRenderer.setSize(window.innerWidth, window.innerHeight);

labelRenderer.domElement.style.position = "absolute";

labelRenderer.domElement.style.top = "0";

labelRenderer.domElement.style.pointerEvents = "none";

document.body.appendChild(labelRenderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enablePan = false;

controls.enableDamping = true;

controls.touches = {
  ONE: THREE.TOUCH.ROTATE,
  TWO: THREE.TOUCH.DOLLY_PAN,
};

// controls.enableDamping = true;

const ambient = new THREE.AmbientLight(0xffffff, 0.6);

scene.add(ambient);

const sunlight = new THREE.PointLight(0xffffff, 3, 500);

scene.add(sunlight);

const textureLoader = new THREE.TextureLoader();

const planets = [];

// const planetInfo = {
//   Mercury: {
//     nama: "Merkurius",
//     deskripsi: `
// Planet terdekat dari Matahari.

// Diameter : 4.879 km
// Jarak dari Matahari : 57,9 juta km
// Revolusi : 88 hari
// Rotasi : 59 hari

// Merkurius merupakan planet terkecil dalam tata surya. Permukaannya penuh kawah dan memiliki suhu yang sangat ekstrem antara siang dan malam.
// `,
//   },

//   Venus: {
//     nama: "Venus",
//     deskripsi: `
// Planet kedua dari Matahari.

// Diameter : 12.104 km
// Jarak dari Matahari : 108 juta km
// Revolusi : 225 hari
// Rotasi : 243 hari

// Venus merupakan planet terpanas di tata surya dengan suhu mencapai sekitar 465°C akibat efek rumah kaca yang sangat kuat.
// `,
//   },

//   Earth: {
//     nama: "Bumi",
//     deskripsi: `
// Planet ketiga dari Matahari.

// Diameter : 12.742 km
// Jarak dari Matahari : 149,6 juta km
// Revolusi : 365 hari
// Rotasi : 24 jam

// Bumi adalah satu-satunya planet yang diketahui memiliki kehidupan. Sekitar 71% permukaannya tertutup air.
// `,
//   },

//   Mars: {
//     nama: "Mars",
//     deskripsi: `
// Planet keempat dari Matahari.

// Diameter : 6.779 km
// Jarak dari Matahari : 227,9 juta km
// Revolusi : 687 hari
// Rotasi : 24,6 jam

// Mars dikenal sebagai Planet Merah karena kandungan oksida besi yang tinggi pada permukaannya.
// `,
//   },

//   Jupiter: {
//     nama: "Jupiter",
//     deskripsi: `
// Planet terbesar dalam tata surya.

// Diameter : 139.820 km
// Jarak dari Matahari : 778 juta km
// Revolusi : 11,86 tahun
// Rotasi : 10 jam

// Jupiter merupakan raksasa gas yang memiliki Great Red Spot, yaitu badai raksasa yang telah berlangsung selama ratusan tahun.
// `,
//   },

//   Saturn: {
//     nama: "Saturnus",
//     deskripsi: `
// Planet keenam dari Matahari.

// Diameter : 116.460 km
// Jarak dari Matahari : 1,4 miliar km
// Revolusi : 29,5 tahun
// Rotasi : 10,7 jam

// Saturnus terkenal karena cincin-cincinnya yang tersusun dari es dan debu luar angkasa.
// `,
//   },

//   Uranus: {
//     nama: "Uranus",
//     deskripsi: `
// Planet ketujuh dari Matahari.

// Diameter : 50.724 km
// Jarak dari Matahari : 2,87 miliar km
// Revolusi : 84 tahun
// Rotasi : 17 jam

// Uranus memiliki kemiringan sumbu rotasi sekitar 98° sehingga tampak berputar menyamping.
// `,
//   },

//   Neptune: {
//     nama: "Neptunus",
//     deskripsi: `
// Planet kedelapan dan terjauh dari Matahari.

// Diameter : 49.244 km
// Jarak dari Matahari : 4,5 miliar km
// Revolusi : 165 tahun
// Rotasi : 16 jam

// Neptunus memiliki angin tercepat dalam tata surya yang dapat mencapai lebih dari 2.000 km/jam.
// `,
//   },
// };

// code baru
const planetInfo = {
  Mercury: {
    nama: "Merkurius",
    deskripsi: `
<p>
Planet terdekat dari Matahari dan merupakan planet terkecil dalam tata surya.
</p>

<hr>

<b>📏 Diameter</b><br>
4.879 km

<br><br>

<b>☀️ Jarak dari Matahari</b><br>
57,9 juta km

<br><br>

<b>🔄 Revolusi</b><br>
88 Hari

<br><br>

<b>🌀 Rotasi</b><br>
59 Hari

<br><br>

<b>🌡️ Suhu</b><br>
-180°C hingga 430°C

<br><br>

<b>🌠 Fakta Menarik</b><br>
Permukaan Merkurius dipenuhi kawah akibat tumbukan asteroid dan meteor selama miliaran tahun.
`,
  },

  Venus: {
    nama: "Venus",
    deskripsi: `
<p>
Planet kedua dari Matahari dan sering disebut saudara kembar Bumi karena ukurannya hampir sama.
</p>

<hr>

<b>📏 Diameter</b><br>
12.104 km

<br><br>

<b>☀️ Jarak dari Matahari</b><br>
108 juta km

<br><br>

<b>🔄 Revolusi</b><br>
225 Hari

<br><br>

<b>🌀 Rotasi</b><br>
243 Hari

<br><br>

<b>🌡️ Suhu</b><br>
465°C

<br><br>

<b>🌠 Fakta Menarik</b><br>
Venus merupakan planet terpanas dalam tata surya karena atmosfernya yang sangat tebal menghasilkan efek rumah kaca ekstrem.
`,
  },

  Earth: {
    nama: "Bumi",
    deskripsi: `
<p>
Planet ketiga dari Matahari dan satu-satunya planet yang diketahui memiliki kehidupan.
</p>

<hr>

<b>📏 Diameter</b><br>
12.742 km

<br><br>

<b>☀️ Jarak dari Matahari</b><br>
149,6 juta km

<br><br>

<b>🛰️ Satelit</b><br>
1 (Bulan)

<br><br>

<b>🔄 Revolusi</b><br>
365 Hari

<br><br>

<b>🌀 Rotasi</b><br>
24 Jam

<br><br>

<b>🌊 Permukaan Air</b><br>
71%

<br><br>

<b>🌠 Fakta Menarik</b><br>
Bumi memiliki atmosfer yang melindungi kehidupan dari radiasi berbahaya dan menjaga suhu tetap stabil.
`,
  },

  Mars: {
    nama: "Mars",
    deskripsi: `
<p>
Planet keempat dari Matahari yang dikenal sebagai Planet Merah.
</p>

<hr>

<b>📏 Diameter</b><br>
6.779 km

<br><br>

<b>☀️ Jarak dari Matahari</b><br>
227,9 juta km

<br><br>

<b>🛰️ Satelit</b><br>
2 (Phobos & Deimos)

<br><br>

<b>🔄 Revolusi</b><br>
687 Hari

<br><br>

<b>🌀 Rotasi</b><br>
24,6 Jam

<br><br>

<b>🌠 Fakta Menarik</b><br>
Mars memiliki gunung tertinggi di tata surya yaitu Olympus Mons dengan tinggi sekitar 22 km.
`,
  },

  Jupiter: {
    nama: "Jupiter",
    deskripsi: `
<p>
Planet terbesar dalam tata surya dan termasuk golongan planet gas raksasa.
</p>

<hr>

<b>📏 Diameter</b><br>
139.820 km

<br><br>

<b>☀️ Jarak dari Matahari</b><br>
778 juta km

<br><br>

<b>🛰️ Satelit</b><br>
95+

<br><br>

<b>🔄 Revolusi</b><br>
11,86 Tahun

<br><br>

<b>🌀 Rotasi</b><br>
10 Jam

<br><br>

<b>🌠 Fakta Menarik</b><br>
Jupiter memiliki badai raksasa bernama Great Red Spot yang telah berlangsung selama ratusan tahun.
`,
  },

  Saturn: {
    nama: "Saturnus",
    deskripsi: `
<p>
Planet keenam dari Matahari yang terkenal dengan sistem cincin spektakulernya.
</p>

<hr>

<b>📏 Diameter</b><br>
116.460 km

<br><br>

<b>☀️ Jarak dari Matahari</b><br>
1,4 miliar km

<br><br>

<b>🛰️ Satelit</b><br>
146+

<br><br>

<b>🔄 Revolusi</b><br>
29,5 Tahun

<br><br>

<b>🌀 Rotasi</b><br>
10,7 Jam

<br><br>

<b>💍 Cincin</b><br>
Terdiri dari es, debu, dan batuan

<br><br>

<b>🌠 Fakta Menarik</b><br>
Jika ditempatkan di lautan raksasa, Saturnus akan mengapung karena massa jenisnya lebih kecil daripada air.
`,
  },

  Uranus: {
    nama: "Uranus",
    deskripsi: `
<p>
Planet ketujuh dari Matahari yang memiliki warna biru kehijauan.
</p>

<hr>

<b>📏 Diameter</b><br>
50.724 km

<br><br>

<b>☀️ Jarak dari Matahari</b><br>
2,87 miliar km

<br><br>

<b>🛰️ Satelit</b><br>
27

<br><br>

<b>🔄 Revolusi</b><br>
84 Tahun

<br><br>

<b>🌀 Rotasi</b><br>
17 Jam

<br><br>

<b>🌠 Fakta Menarik</b><br>
Uranus berputar hampir rebah dengan kemiringan sumbu sekitar 98°.
`,
  },

  Neptune: {
    nama: "Neptunus",
    deskripsi: `
<p>
Planet kedelapan dan terjauh dari Matahari.
</p>

<hr>

<b>📏 Diameter</b><br>
49.244 km

<br><br>

<b>☀️ Jarak dari Matahari</b><br>
4,5 miliar km

<br><br>

<b>🛰️ Satelit</b><br>
14

<br><br>

<b>🔄 Revolusi</b><br>
165 Tahun

<br><br>

<b>🌀 Rotasi</b><br>
16 Jam

<br><br>

<b>🌪️ Kecepatan Angin</b><br>
2.000+ km/jam

<br><br>

<b>🌠 Fakta Menarik</b><br>
Neptunus memiliki angin tercepat yang pernah ditemukan di tata surya.
`,
  },
};

function createLabel(text) {
  const div = document.createElement("div");

  div.className = "planet-label";

  div.textContent = text;

  const label = new THREE.CSS2DObject(div);

  return label;
}

function createOrbit(radius) {
  const curve = new THREE.EllipseCurve(0, 0, radius, radius);

  const points = curve.getPoints(100);

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({
    color: 0x444444,
  });

  const orbit = new THREE.LineLoop(geometry, material);

  orbit.rotation.x = Math.PI / 2;

  scene.add(orbit);
}

function createPlanet(name, size, distance, textureFile) {
  const texture = textureLoader.load(textureFile);

  const geometry = new THREE.SphereGeometry(size, 32, 32);

  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });

  const planet = new THREE.Mesh(geometry, material);

  planet.name = name;
  const label = createLabel(name);

  label.position.set(0, size + 2, 0);

  planet.add(label);

  const orbit = new THREE.Object3D();

  orbit.add(planet);

  planet.position.x = distance;

  scene.add(orbit);

  planets.push(planet);

  createOrbit(distance);

  return {
    planet,
    orbit,
  };
}

const sunTexture = textureLoader.load("textures/sun.jpg");

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(8, 64, 64),
  new THREE.MeshBasicMaterial({
    map: sunTexture,
  }),
);

scene.add(sun);

const mercury = createPlanet("Mercury", 1.5, 15, "textures/mercury.jpg");

const venus = createPlanet("Venus", 2, 22, "textures/venus.jpg");

const earth = createPlanet("Earth", 2.3, 30, "textures/earth.jpg");

const mars = createPlanet("Mars", 1.8, 38, "textures/mars.jpg");

const jupiter = createPlanet("Jupiter", 5, 50, "textures/jupiter.jpg");

const saturn = createPlanet("Saturn", 4.5, 65, "textures/saturn.jpg");

// ======================
// CINCIN SATURNUS
// ======================

const saturnRingGeometry = new THREE.RingGeometry(5.5, 9, 128);

const saturnRingMaterial = new THREE.MeshBasicMaterial({
  color: 0xd8c29d,

  side: THREE.DoubleSide,

  transparent: true,

  opacity: 0.9,
});

const saturnRing = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);

// posisi cincin mendatar mengelilingi planet
saturnRing.rotation.x = Math.PI / 2;

// sedikit naik supaya tidak bertabrakan dengan permukaan planet
saturnRing.position.y = 0.1;

saturn.planet.add(saturnRing);

const uranus = createPlanet("Uranus", 3.5, 80, "textures/uranus.jpg");

const neptune = createPlanet("Neptune", 3.5, 95, "textures/neptune.jpg");

const starsGeometry = new THREE.BufferGeometry();

const starsVertices = [];

for (let i = 0; i < 10000; i++) {
  starsVertices.push(THREE.MathUtils.randFloatSpread(1000));

  starsVertices.push(THREE.MathUtils.randFloatSpread(1000));

  starsVertices.push(THREE.MathUtils.randFloatSpread(1000));
}

starsGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(starsVertices, 3),
);

const stars = new THREE.Points(
  starsGeometry,
  new THREE.PointsMaterial({
    size: 1,
  }),
);

scene.add(stars);

const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();

const defaultInfoPanel = `
    <h2>🪐 Informasi Planet</h2>
    <p>
        Selamat datang di Pembelajaran Tata Surya Interaktif.

        <br><br>

        Klik salah satu planet untuk melihat informasi lengkap mengenai:
        <br>
        • Diameter
        <br>
        • Jarak dari Matahari
        <br>
        • Rotasi
        <br>
        • Revolusi
        <br>
        • Fakta Menarik

        <br><br>

        🚀 Jelajahi tata surya dan pelajari setiap planet!
    </p>
`;

document.getElementById("infoPanel").innerHTML = defaultInfoPanel;

function selectPlanet(event) {
  let clientX;
  let clientY;

  if (event.touches && event.touches.length > 0) {
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
  } else {
    clientX = event.clientX;
    clientY = event.clientY;
  }

  mouse.x = (clientX / window.innerWidth) * 2 - 1;

  mouse.y = -(clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  raycaster.far = 200;
  raycaster.params.Points.threshold = 5;

  const intersects = raycaster.intersectObjects(planets, true);

  if (intersects.length > 0) {
    const selected = intersects[0].object.name;

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      document.getElementById("modalContent").innerHTML = `
        <h2>${planetInfo[selected].nama}</h2>
        ${planetInfo[selected].deskripsi}
      `;

      document.getElementById("planetModal").classList.add("show");
    } else {
      document.getElementById("infoPanel").innerHTML = `
        <h2>${planetInfo[selected].nama}</h2>
        ${planetInfo[selected].deskripsi}

        <div class="info-actions">
            <button id="resetInfoBtn">
                ⬅ KEMBALI
            </button>
        </div>
    `;
    }
  }

  const resetBtn = document.getElementById("resetInfoBtn");

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      document.getElementById("infoPanel").innerHTML = defaultInfoPanel;
    });
  }
}

renderer.domElement.addEventListener("pointerdown", selectPlanet);

renderer.domElement.addEventListener("touchstart", selectPlanet, {
  passive: true,
});

renderer.domElement.addEventListener("click", selectPlanet);

let isPlaying = true;

document.getElementById("playBtn").addEventListener("click", () => {
  isPlaying = !isPlaying;

  document.getElementById("playBtn").innerText = isPlaying ? "Pause" : "Play";
});

// CODE BARU
const soundBtn = document.getElementById("soundBtn");

const narasi = new Audio("audio/narasi.mp3");

let isNarasiPlaying = false;

soundBtn.addEventListener("click", () => {
  if (isNarasiPlaying) {
    narasi.pause();
    narasi.currentTime = 0;

    soundBtn.innerHTML = "🔊 PLAY SOUND";

    isNarasiPlaying = false;
  } else {
    narasi.play();

    soundBtn.innerHTML = "🔇 STOP SOUND";

    isNarasiPlaying = true;
  }
});

narasi.addEventListener("ended", () => {
  soundBtn.innerHTML = "🔊 PLAY SOUND";

  isNarasiPlaying = false;
});

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  if (isPlaying) {
    mercury.orbit.rotation.y += 0.04;
    venus.orbit.rotation.y += 0.03;
    earth.orbit.rotation.y += 0.02;
    mars.orbit.rotation.y += 0.018;

    jupiter.orbit.rotation.y += 0.01;
    saturn.orbit.rotation.y += 0.008;
    saturn.planet.rotation.y += 0.01;
    uranus.orbit.rotation.y += 0.006;
    neptune.orbit.rotation.y += 0.004;
  }

  sun.rotation.y += 0.002;

  renderer.render(scene, camera);

  labelRenderer.render(scene, camera);
}

animate();

const closeModalBtn = document.getElementById("closeModalBtn");

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    document.getElementById("planetModal").classList.remove("show");
  });
}

// Klik area gelap untuk menutup modal
const planetModal = document.getElementById("planetModal");

planetModal.addEventListener("click", (e) => {
  if (e.target === planetModal) {
    planetModal.classList.remove("show");
  }
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  labelRenderer.setSize(window.innerWidth, window.innerHeight);
});

// code baru
const rocketCursor = document.getElementById("rocketCursor");

if (rocketCursor) {
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  animateRocket();
}

function animateRocket() {
  rocketX += (mouseX - rocketX) * 0.15;
  rocketY += (mouseY - rocketY) * 0.15;

  rocketCursor.style.left = rocketX + "px";

  rocketCursor.style.top = rocketY + "px";

  requestAnimationFrame(animateRocket);
}
