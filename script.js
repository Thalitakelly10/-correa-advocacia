/* =========================================================
   CORRÊA ADVOCACIA E CONSULTORIA JURÍDICA
   JavaScript principal do site
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     MENU MOBILE
  ===================================================== */

  const menuBtn = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuBtn && nav) {

    menuBtn.addEventListener("click", function () {

      const menuAberto = nav.classList.toggle("open");

      menuBtn.setAttribute(
        "aria-expanded",
        String(menuAberto)
      );

    });


    /* Fecha o menu ao clicar em um item */

    document.querySelectorAll(".nav a").forEach(function (link) {

      link.addEventListener("click", function () {

        nav.classList.remove("open");

        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }



  /* =====================================================
     ANO AUTOMÁTICO NO RODAPÉ
  ===================================================== */

  const yearElement = document.getElementById("year");

  if (yearElement) {

    yearElement.textContent =
      new Date().getFullYear();

  }



  /* =====================================================
     ROLAGEM SUAVE
  ===================================================== */

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

      const targetId =
        this.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (target) {

        event.preventDefault();

        const header =
          document.querySelector(".site-header");

        const headerHeight =
          header ? header.offsetHeight : 0;

        const position =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: position,
          behavior: "smooth"
        });

      }

    });

  });



  /* =====================================================
     DESTAQUE DO MENU CONFORME A ROLAGEM
  ===================================================== */

  const sections =
    document.querySelectorAll("main section[id]");

  const navLinks =
    document.querySelectorAll('.nav a[href^="#"]');


  function atualizarMenu() {

    let currentSection = "";

    sections.forEach(function (section) {

      const sectionTop =
        section.offsetTop - 150;

      const sectionHeight =
        section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY <
          sectionTop + sectionHeight
      ) {

        currentSection =
          section.getAttribute("id");

      }

    });


    navLinks.forEach(function (link) {

      link.classList.remove("active");

      if (
        link.getAttribute("href") ===
        "#" + currentSection
      ) {

        link.classList.add("active");

      }

    });

  }


  window.addEventListener(
    "scroll",
    atualizarMenu
  );



  /* =====================================================
     EFEITO DO CABEÇALHO AO ROLAR
  ===================================================== */

  const header =
    document.querySelector(".site-header");


  function atualizarHeader() {

    if (!header) {
      return;
    }

    if (window.scrollY > 30) {

      header.classList.add(
        "header-scrolled"
      );

    } else {

      header.classList.remove(
        "header-scrolled"
      );

    }

  }


  window.addEventListener(
    "scroll",
    atualizarHeader
  );

  atualizarHeader();



  /* =====================================================
     FORMULÁRIO DE CONTATO
  ===================================================== */

  const form =
    document.getElementById("contactForm");

  const status =
    document.getElementById("formStatus");


  if (form) {

    form.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        const nome =
          form.querySelector(
            '[name="nome"]'
          )?.value.trim();

        const email =
          form.querySelector(
            '[name="email"]'
          )?.value.trim();

        const mensagem =
          form.querySelector(
            '[name="mensagem"]'
          )?.value.trim();


        if (
          !nome ||
          !email ||
          !mensagem
        ) {

          if (status) {

            status.textContent =
              "Por favor, preencha os campos obrigatórios.";

          }

          return;

        }


        if (status) {

          status.textContent =
            "Obrigada pelo contato. Em breve retornaremos sua mensagem.";

        }


        /*
        ====================================================
        IMPORTANTE

        Neste momento o formulário está funcionando
        visualmente.

        Depois vamos conectá-lo ao canal definitivo
        do escritório:

        - WhatsApp
        - E-mail profissional
        - Serviço de formulário

        ====================================================
        */

      }
    );

  }



  /* =====================================================
     ANIMAÇÃO SUAVE DOS ELEMENTOS
  ===================================================== */

  const animatedElements =
    document.querySelectorAll(
      ".service-card, .content-card, .hero-card"
    );


  if (
    "IntersectionObserver" in window
  ) {

    const observer =
      new IntersectionObserver(

        function (entries) {

          entries.forEach(
            function (entry) {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "visible"
                );

                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },

        {
          threshold: 0.15
        }

      );


    animatedElements.forEach(
      function (element) {

        element.classList.add(
          "animate-on-scroll"
        );

        observer.observe(
          element
        );

      }
    );

  }

});
