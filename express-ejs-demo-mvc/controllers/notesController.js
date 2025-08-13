exports.listNotes = (req, res) => {
    const notes = req.app.locals.noteModel.findAll();
    res.render('notes/index', { title: '메모 목록', notes });
  };
  
  exports.showNewForm = (req, res) => {
    res.render('notes/new', { title: '새 메모' });
  };
  
  exports.createNote = (req, res) => {
    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(400).render('notes/new', { title: '새 메모', error: '제목과 내용을 입력하세요.' });
    }
    req.app.locals.noteModel.create(title, body);
    res.redirect('/notes');
  };
  
  exports.showNote = (req, res, next) => {
    const note = req.app.locals.noteModel.findById(parseInt(req.params.id, 10));
    if (!note) return next();
    res.render('notes/show', { title: note.title, note });
  };
  
  exports.deleteNote = (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const note = req.app.locals.noteModel.findById(id);
    if (!note) return next();
    req.app.locals.noteModel.delete(id);
    res.redirect('/notes');
  };
