import { UseRoleGuard } from "./usuario-roles.guard";

describe('UsuarioRolesGuard', () => {
  it('should be defined', () => {
    expect(new UseRoleGuard()).toBeDefined();
  });
});
