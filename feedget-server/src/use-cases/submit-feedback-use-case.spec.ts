import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy }, //NECESSÁRIO PASSAR DEPENDÊNCIAS FALSAS.
  { sendMail: sendEmailSpy } // TESTE UNITÁRIO NÃO TESTA DEPENDÊNCIAS EXTERNAS
);

// spies/espiões. Saber dentro do deste se uma função foi chamada
// Vários testes para uma funcionalidade
describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Example",
        screenshot: "data:image/png;base64, example",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendEmailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit a feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "Example",
        screenshot: "data:image/png;base64, example",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64, example",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Comment example",
        screenshot: "teste.png",
      })
    ).rejects.toThrow();
  });
});
