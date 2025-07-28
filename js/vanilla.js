function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach((section) => {
      section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');
const grid = document.getElementById('function')

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed')
  grid.classList.toggle('collapsed');
});

    var texts = document.querySelectorAll(".text");

    texts.forEach(text => {
        var truncated = text.innerHTML.substring(0, 100) + "...."
        text.innerHTML = truncated
    })


    
