const requestURL = 'SuperHeroesEquipo.json';
const header = document.querySelector('header');
const section = document.querySelector('.team-container');

fetch(requestURL)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(superEquipo => {
        mostrarEncabezado(superEquipo);
        mostrarMiembros(superEquipo);
    })
    .catch(error => {
        console.error("Hubo un problema al cargar el JSON:", error);
        header.innerHTML = '<h1 class="text-3xl font-bold">Error al cargar los datos.</h1>';
    });


function mostrarEncabezado(jsonObjeto) {
    const miH1 = document.createElement('h1');
    const miP = document.createElement('div'); 

    miH1.className = "text-5xl md:text-6xl font-black uppercase tracking-tighter mb-2 drop-shadow-md";
    miH1.textContent = jsonObjeto.nombreEscuadron;

    miP.className = "flex justify-center gap-4 text-sm md:text-lg font-medium opacity-90";
    miP.innerHTML = `
        <span class="bg-black/30 px-3 py-1 rounded-full"> ${jsonObjeto.ciudadNatal}</span>
        <span class="bg-black/30 px-3 py-1 rounded-full"> Est. ${jsonObjeto.formadoEn}</span>
    `;

    header.appendChild(miH1);
    header.appendChild(miP);
}

function mostrarMiembros(jsonObjeto) {
    const miembros = jsonObjeto.miembros;

    for (const miembro of miembros) {
        const article = document.createElement('article');
        const h2 = document.createElement('h2');
        const pEdad = document.createElement('p');
        const pIdentidad = document.createElement('p');
        const divPoderes = document.createElement('div'); 
        const ulPoderes = document.createElement('ul');

        article.className = "bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col";

        h2.className = "bg-slate-800 text-white text-2xl font-bold p-4 text-center uppercase tracking-wide";
        h2.textContent = miembro.nombre;

        const infoClass = "px-6 py-2 text-slate-700 border-b border-slate-100 text-sm";

        pEdad.className = infoClass;
        pEdad.innerHTML = `<span class="font-bold text-red-600">Edad:</span> ${miembro.edad} años`;

        pIdentidad.className = infoClass;
        pIdentidad.innerHTML = `<span class="font-bold text-red-600">Identidad:</span> ${miembro.identidadSecreta}`;

        divPoderes.className = "px-6 pt-4 pb-2";
        divPoderes.innerHTML = '<span class="font-bold text-slate-900 uppercase text-xs tracking-wider">Habilidades:</span>';

        ulPoderes.className = "px-6 pb-6 list-none space-y-1 flex-grow";

        for (const poder of miembro.poderes) {
            const listItem = document.createElement('li');
            listItem.className = "text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded inline-block mr-1 mb-1 border border-slate-200";
            listItem.textContent = poder;
            ulPoderes.appendChild(listItem);
        }

        article.appendChild(h2);
        article.appendChild(pIdentidad); 
        article.appendChild(pEdad);
        article.appendChild(divPoderes);
        article.appendChild(ulPoderes);

        section.appendChild(article);
    }
}