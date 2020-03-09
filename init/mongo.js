db.createUser(
    {
      user: 'user_name_have_to_change',
      pwd: 'pwd_name_have_to_change',
      roles: [
        {
          role: 'readWrite',
          db: 'learning-path-constructor'
        }
      ],
    },
)
