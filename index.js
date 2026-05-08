// 1. Atualizar ano no footer
document.getElementById("year").textContent = new Date().getFullYear();

// 2. Cursor customizado
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");

// Seguir o mouse
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  ring.style.left = e.clientX + "px";
  ring.style.top = e.clientY + "px";
});

// Aumentar tamanho do cursor ao passar por links
const links = document.querySelectorAll("a, button");
links.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%,-50%) scale(2.5)";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%,-50%) scale(1)";
  });
});

// Partículas animadas
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let canvasWidth, canvasHeight;

// Ajustar tamanho do canvas quando a janela redimensiona
function resizeCanvas() {
  canvasWidth = canvas.width = window.innerWidth;
  canvasHeight = canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Criar partículas
const particles = Array.from({ length: 55 }, () => ({
  x: Math.random() * canvasWidth,
  y: Math.random() * canvasHeight,
  speedX: (Math.random() - 0.5) * 0.3,
  speedY: (Math.random() - 0.5) * 0.3,
  radius: Math.random() * 1.5 + 0.5,
}));

// Animar partículas
function animateParticles() {
  // Limpar canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  particles.forEach((particle) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    if (particle.x < 0 || particle.x > canvasWidth) particle.speedX *= -1;
    if (particle.y < 0 || particle.y > canvasHeight) particle.speedY *= -1;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(220,255,125,0.25)";
    ctx.fill();
  });

  // Desenhar linhas conectando partículas próximas
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Se distância é menor que 120px, desenha linha
      if (distance < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(220,255,125,${0.07 * (1 - distance / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  // Repetir animação
  requestAnimationFrame(animateParticles);
}

animateParticles();

// 4. Navbar encolher ao fazer scroll
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// 5. Revelar elementos ao fazer scroll (fade-up animation)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Se o elemento tem classe "stagger", anima filhos um por um
        if (entry.target.classList.contains("stagger")) {
          const children = entry.target.querySelectorAll(":scope > *");
          children.forEach((child) => {
            child.classList.add("visible");
          });
        } else {
          // Senão, apenas adiciona a classe "visible"
          entry.target.classList.add("visible");
        }
      }
    });
  },
  { threshold: 0.12 },
);

// Observar todos os elementos com fade-up ou stagger
document.querySelectorAll(".fade-up, .stagger").forEach((element) => {
  observer.observe(element);
});
