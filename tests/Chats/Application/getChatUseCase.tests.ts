describe('getChatUseCase', () => {

    let chatsRepository : IChatsRepository; 
    let getChatUseCase : IGetChatUseCase;

    beforeEach(() => {
        chatsRepository = chatsRepositoryMock;
        getChatUseCase = new GetChatUseCase(chatsRepository);
    })

    it('gets chat', async () => {
        const chatId = '1';
        const chat = createChat(chatId);
        chatsRepository.findBy = jest.fn().mockReturnValue(chat);

        const result = await getChatUseCase.execute(chatId);

        expect(chatsRepository.findBy).toBeCalled();
        expect(result).toBe(chat);
    });

});