describe("get chats use Case", () => {
    let chatsRepository : IChatsRepository; 
    let getChatsUseCase : IGetChatsUseCase;

    beforeEach(() => {
        chatsRepository = chatsRepositoryMock;
        getChatsUseCase = new GetChatsUseCase(chatsRepository);
    })

    it("gets chats", async () => {
        const userId = "1";
        const chats = [createChat(userId)];
        chatsRepository.findAll = jest.fn().mockReturnValue(chats);

        await getChatsUseCase.execute(userId);

        expect(chatsRepository.findAll).toBeCalled();
        expect(chatsRepository.findAll).toReturnWith(chats);
    });
})