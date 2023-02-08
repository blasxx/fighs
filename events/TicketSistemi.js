const {Permissions, MessageEmbed, MessageActionRow, MessageSelectMenu }=require('discord.js')
const { kategori, yetkili } = require('../config.json');
module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if (!interaction.isSelectMenu()) return;
        
	const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                    .setCustomId('del')
                    .setPlaceholder('Bileti silmek için seçin!')
					.addOptions([
						{
							label: '🗑️ Silinen bilet',
							description: 'Kanalı sil',
							value: 'delete',
						}
					])
                );
                
                
        let catégorie = kategori
        let roleStaff = interaction.guild.roles.cache.get(yetkili)

        let DejaUnChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id)
        
        if(interaction.customId === "del") {
            if (interaction.values[0] == "delete") {
                const channel = interaction.channel
                channel.delete();
              
            }
        }

        if (interaction.customId == "select") {
            if (DejaUnChannel) return interaction.reply({content: 'Sunucuda zaten açık bir biletiniz var.', ephemeral: true})
            if (interaction.values[0] == "yetkili") {
                interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${catégorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleStaff,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const yetkili = new MessageEmbed()
                    .setTitle('Pmco Rol Bileti')
                    .setDescription("Merhaba, ben **FİGHT FOR GLORY CONTACT**. Nasıl rol alacağınız konusunda size bilgi vereceğim. Pmco rolüne sahip olmak istiyorsanız **luqipedia** bağlantısını ve logosunu göndermeniz yeterlidir, yetkililer gelip ilgileneceklerdir.")
                    .setFooter('FİGHT FOR GLORY CONTACT')
                    c.send({embeds: [yetkili], content: `${roleStaff} | ${interaction.user}`, components: [row]})
                    interaction.reply({content: `Biletiniz başarıyla açıldı. <#${c.id}>`, ephemeral: true})
                })
                
            } else if (interaction.values[0] == "şikayet") {
                interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${catégorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleStaff,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const şikayet = new MessageEmbed()
                    .setTitle('Partnerlik bileti')
                    .setDescription('Lütfen ortak metninizi bırakın ve ardından aşağıda paylaştığım metni paylaşın, yetkili kişi metninizi gördüğünde paylaşılacaktır.')
                    .setFooter('FİGHT FOR GLORY CONTACT')
                    c.send({embeds: [şikayet], content: `${roleStaff} | ${interaction.user}`, components: [row]})
                    interaction.reply({content: `Biletiniz başarıyla açıldı. <#${c.id}>`, ephemeral: true})
                    c.send(`

__F4G TÜRKİYE__
> **Öncelikle herkese merhaba**

> ** Sen ve takımın sağlam takımlarla karşı karşıya mı gelmek istiyorsun o zaman tam yerini buldun**

> **Discord sunucumuzda ;**

> **Anında rol**
> **Her gün evening**
> **Gelişmiş odalar**
> **En Tecrübeli Yetkili Kadrosu**
> **Çok Hızlı Result**

__**Düzenlenen Scrimler; **__

> **Diamond Series**
> **Platin Series**
> **PMCO Lobyler**
> **PMPL Lobyler **

> **Seni ve takımını sunucumuzda görmekten çok memnun oluruz aşağıdaki linke dokunarak bize katılabilirsiniz**


 https://discord.gg/MGtGSXF9x9 `)
                  
                  
                        })}
          
                
          
          else if (interaction.values[0] == "ortaklık") {
                interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${catégorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleStaff,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const embed = new MessageEmbed()
                    .setTitle('Destek almak için bilet')
                    .setDescription('Lütfen başvurunuzu detaylandırın, böylece bir sunucu moderatörü sorumluluğu üstlenecek.')
                    .setFooter('FİGHT FOR GLORY CONTACT')
                    c.send({embeds: [embed], content: `${roleStaff} | ${interaction.user}`, components: [row]})
                    interaction.reply({content: `Biletiniz başarıyla açılmıştır. <#${c.id}>`, ephemeral: true})
                })
                
            
                
            
            }
        }
    }
}