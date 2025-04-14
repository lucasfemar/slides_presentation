interface IBodyError {
  action: string;
  statusCode: number;
}
interface IConstructor {
  message?: string;
  cause?: unknown;
  statusCode?: number;
}
export class InternalServerError extends Error implements IBodyError {
  action: string;
  statusCode: number;
  constructor({ cause, statusCode }: IConstructor) {
    super("Um erro interno não esperado aconteceu.", {
      cause,
    });
    this.name = "InternalServerError";
    this.action = "Entre em contato com o suporte.";
    this.statusCode = statusCode || 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class MethodNotAllowedError extends Error implements IBodyError {
  action: string;
  statusCode: number;
  constructor({ message, cause }: IConstructor = {}) {
    super(message || "Método não permitido para este endpoint.", {
      cause: cause,
    });
    this.name = "MethodNotAllowedError";
    this.action = "Verifique se o método HTTP é válido para este endpoint.";
    this.statusCode = 405;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class AuthenticationError extends Error implements IBodyError {
  action: string;
  statusCode: number;
  constructor({ message, cause }: IConstructor = {}) {
    super(message || "Falha ao autenticar o usuário.", {
      cause: cause,
    });
    this.name = "AuthenticationError";
    this.action = "Verifique se o token de sessão é valido.";
    this.statusCode = 403;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class ValidationErrors extends Error implements IBodyError {
  action: string;
  statusCode: number;
  constructor({ message, cause }: IConstructor = {}) {

    super(message || "Erro de validação.", {
      cause: cause,
    });
    this.name = "ValidationErrors";
    this.action = "Verifique os parâmetros de entrada.";
    this.statusCode = 400;
  }
  toJSON() {
    const details = this.message.split(";");
    return {
      name: this.name,
      message: details,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class ResourceRetrievingError extends Error implements IBodyError {
  action: string;
  statusCode: number;
  constructor({ message, cause }: IConstructor = {}) {
    super(message || "Falha ao buscar registros.", {
      cause: cause,
    });
    this.name = "ResourceRetrievingError";
    this.action = "Verifique os paramêtros da buscas";
    this.statusCode = 404;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class ResourceCreationError extends Error implements IBodyError {
  action: string;
  statusCode: number;
  constructor({ message, cause }: IConstructor = {}) {
    super(message || "Falha ao criar registros.", {
      cause: cause,
    });
    this.name = "ResourceCreationError";
    this.action = "Verifique os parâmetros de entrada.";
    this.statusCode = 400;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
