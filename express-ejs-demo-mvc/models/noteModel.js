let notes = [
    { id: 1, title: '첫 메모', body: 'EJS 연습', createdAt: new Date() }
  ];
  
  const nextId = () => (notes.length ? Math.max(...notes.map(n => n.id)) + 1 : 1);
  
  module.exports = {
    findAll() {
      return notes;
    },
    findById(id) {
      return notes.find(n => n.id === id);
    },
    create(title, body) {
      const note = { id: nextId(), title, body, createdAt: new Date() };
      notes.push(note);
      return note;
    },
    delete(id) {
      const idx = notes.findIndex(n => n.id === id);
      if (idx !== -1) notes.splice(idx, 1);
    }
  };
  