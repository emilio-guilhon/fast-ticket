export function app() {
  return (
    <div className="container">
      <header className="header">
        <img src="" alt="" />
        <span>xxx</span>
      </header>

      <form>
        <div className="inputContainer">
          <label htmlFor="nomeCompleto">Nome</label>
          <input
            type="text"
            name="nomeCompleto"
            id="nomeCompleto"
            placeholder="Seu nome"
          />
        </div>

        <div className="inputContainer">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="pessoa@email.com"
          />
        </div>

        <div className="inputContainer">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="**********"
          />
        </div>

        <a href="">Esqueceu sua senha ?</a>

        <button className="Button"></button>
      </form>
    </div>
  );
}
