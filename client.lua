local TE = TriggerEvent
local TSE = TriggerServerEvent
local AEH = AddEventHandler
local RNE = RegisterNetEvent
local CMD = RegisterCommand
local RNC = RegisterNUICallback
local CT = CreateThread

local ESX = nil
local cache = {}
local bojeKose = {}

local torsoskinut = false
local maskaskinuta = false
local kapaskinuta = false
local pancirskinut = false
local pantoleskinute = false
local cipeleskinute = false
local naocaleskinute = false

local torsocachean = false
local maskacache = false
local kapacacheana = false
local pancircachean = false
local pantolecacheane = false
local cipelecacheane = false
local naocalecacheane = false


local unutarButika = false

local odjecaKodovi = {
	torso = 11,
	cipele = 6, 
	pancir = 9, 
	maska = 1, 
	pantole = 4, 
	kapa = 0, 
	naocale = 1, 
	ruke = 3, 
	potkosulja = 8, 
	kosa = 2,
	sat = 6,
	narukvica = 7,
}

local facaKodovi = {
	brada = 1,
	obrve = 2, 
	bore = 3,
	pjegice = 9,
	oziljak = 7,
}

local sirineKodovi = {
	obrveVisina = 7,
	obrveSirina = 8,
	obrazVisina = 9, 
	obrazSirina = 10,
	nosVisina = 1,
	nosSirina = 2,
}

local torso = nil

function CreateSkinCam()
	if not DoesCamExist(cam) then
		cam = CreateCam('DEFAULT_SCRIPTED_CAMERA', true)
	end

	SetCamActive(cam, true)
	RenderScriptCams(true, true, 500, true, true)
	SetEntityHeading(PlayerPedId(), 180.0)
	coords = GetEntityCoords(PlayerPedId())
	SetCamCoord(cam, coords.x+0.2,coords.y-1.2,coords.z+0.6)
	isCameraActive = true
end

function DeleteSkinCam()
	isCameraActive = false
	SetCamActive(cam, false)
	RenderScriptCams(false, true, 500, true, true)
	cam = nil
end

LokacijaKamere = 0.6
heading_igraca = 180.0
DaljinaKamere = 1.2
StranaKamere = 0.2

Citizen.CreateThread(function()

	while true do
		Citizen.Wait(0)
		if isCameraActive then
			local playerPed = PlayerPedId()
			local coords    = GetEntityCoords(playerPed)
			local heading = GetEntityHeading(playerPed)
			SetCamCoord(cam, coords.x+StranaKamere,coords.y-DaljinaKamere,coords.z+LokacijaKamere)
		else
			Citizen.Wait(1000)
		end
	end
end)
CreateThread(function()
for k, v in pairs(Config.Pedovi) do
exports['qtarget']:AddTargetModel(v[6], {
      	options = {
      	{
              	event = "openClothes_shop_target",
              	icon = "fab fa-creative-commons-by",
              	label = "Otvori butik",
      	},
      	{
        	event = "butik:opcije",
        	icon = "fab fa-creative-commons-by",
        	label = "Kontrolisi Outfite",
	},
    	},
      distance = 1.5
})		
end
end)


Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)
		if isCameraActive then
			if IsControlPressed(0, 189) then
				heading_igraca = heading_igraca+3
			elseif IsControlPressed(0, 190) then
				heading_igraca = heading_igraca-3
			end
		else
			Citizen.Wait(1000)
			--ESX.TriggerServerCallback('esx_skin:getPlayerSkin', function(skin)
			--	Lice1 = skin.dad
			--	Ten = skin.skin_c
			--TriggerEvent('skinchanger:loadSkin', skin)
			--end)
		end
	end
end)

RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(playerData)
	ESX.TriggerServerCallback('esx_skin:getPlayerSkin', function(skin)
		Lice1 = skin.dad
		Lice2 = skin.mom
		Ten = skin.skin_c
		TriggerEvent('skinchanger:loadSkin', skin)
		TriggerEvent("esx:restoreLoadout")
	end)
end)




Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end

	while ESX.GetPlayerData().job == nil do
		Citizen.Wait(10)
	end
	PlayerData = ESX.GetPlayerData()
	--ESX.TriggerServerCallback('esx_skin:getPlayerSkin', function(skin)
	--	Lice1 = skin.dad
	--	Ten = skin.skin_c
	--TriggerEvent('skinchanger:loadSkin', skin)
	--end)
end)

Citizen.CreateThread(function()
	while true do
		Wait(500)
		local pedara = PlayerPedId()
		cache["torso"] = GetPedDrawableVariation(pedara, odjecaKodovi.torso)
		cache["torso2"] = GetPedTextureVariation(pedara, odjecaKodovi.torso)
		cache["maska"] = GetPedDrawableVariation(PlayerPedId(), odjecaKodovi.maska)
		cache["maska2"] = GetPedTextureVariation(pedara, odjecaKodovi.maska)
		cache["kapa"] = GetPedPropIndex(pedara, odjecaKodovi.kapa)
		cache["kapa2"] = GetPedPropTextureIndex(pedara, odjecaKodovi.kapa)
		cache["pantole"] = GetPedDrawableVariation(pedara, odjecaKodovi.pantole)
		cache["pantole2"] = GetPedTextureVariation(pedara, odjecaKodovi.pantole)
		cache["cipele"] = GetPedDrawableVariation(pedara, odjecaKodovi.cipele)
		cache["cipele2"] = GetPedTextureVariation(pedara, odjecaKodovi.cipele)
		cache["pancir"] = GetPedDrawableVariation(pedara, odjecaKodovi.pancir)
		cache["pancir2"] = GetPedTextureVariation(pedara, odjecaKodovi.pancir)
		cache["naocale"] = GetPedPropIndex(pedara, odjecaKodovi.naocale)
		cache["naocale2"] = GetPedPropTextureIndex(pedara, odjecaKodovi.naocale)
		cache["ruke"] = GetPedDrawableVariation(pedara, odjecaKodovi.ruke)
		cache["ruke2"] = GetPedTextureVariation(pedara, odjecaKodovi.ruke)
		cache["potkosulja"] = GetPedDrawableVariation(pedara, odjecaKodovi.potkosulja)
		cache["potkosulja2"] = GetPedTextureVariation(pedara, odjecaKodovi.potkosulja)
		cache["kosa"] = GetPedDrawableVariation(pedara, odjecaKodovi.kosa)
		cache["kosa2"] = GetPedTextureVariation(pedara, odjecaKodovi.kosa)
		cache["kosa_boja"] = GetPedHairColor(PlayerPedId())
		cache["narukvica"] = GetPedPropIndex(pedara, odjecaKodovi.narukvica)
		cache["narukvica2"] = GetPedPropTextureIndex(pedara, odjecaKodovi.narukvica)
		cache["sat"] = GetPedPropIndex(pedara, odjecaKodovi.sat)
		cache["usi"] = GetPedPropIndex(pedara, 2)
		cache["usi2"] = GetPedPropTextureIndex(pedara, 2)
		cache["sat2"] = GetPedPropTextureIndex(pedara, odjecaKodovi.sat)
		local uspjesno, bradaValue, tipBoje, prvaBoja, drugaBoja, gustoca = GetPedHeadOverlayData(PlayerPedId(), facaKodovi.brada)
		cache["brada"] = bradaValue
		cache["brada_gustoca"] = gustoca
		cache["brada_boja"] = prvaBoja
	end
end)
DaLiJeKomandaSkin = false


CreateThread(function()
    for _,v in pairs(Config.Pedovi) do
      RequestModel(GetHashKey(v[6]))
      while not HasModelLoaded(GetHashKey(v[6])) do
        Wait(1)
      end
      RequestAnimDict("mini@strip_club@idles@bouncer@base")
      while not HasAnimDictLoaded("mini@strip_club@idles@bouncer@base") do
        Wait(1)
      end
      ped =  CreatePed(4, v[6],v[1],v[2],v[3], 3374176, false, true)
      SetEntityHeading(ped, v[5])
      FreezeEntityPosition(ped, true)

      SetEntityInvincible(ped, true)
      PlaceObjectOnGroundProperly(ped)
      SetBlockingOfNonTemporaryEvents(ped, true)
      TaskPlayAnim(ped,"mini@strip_club@idles@bouncer@base","base", 8.0, 0.0, -1, 1, 0, 0, 0, 0)
    end
end)

RegisterNetEvent("openClothes_shop_target")
AddEventHandler("openClothes_shop_target", function(skinkomanda)
	if skinkomanda then
		DaLiJeKomandaSkin = true
	end
	unutarButika = true
	SendNUIMessage({tip = "butik"})
	SetNuiFocus(true, true)
	CreateSkinCam()
end)
CreateThread(function()
	for k,v in pairs(Config.Shops) do
		local blip = AddBlipForCoord(v)
		SetBlipScale(blip, 0.6)
		SetBlipSprite (blip, 73)
		SetBlipColour (blip, 47)
		SetBlipAsShortRange(blip, true)
		BeginTextCommandSetBlipName('STRING')
		AddTextComponentSubstringPlayerName('Butik')
		EndTextCommandSetBlipName(blip)
	end
end)


RNC('promjeniKameruNaDugme', function(data)
	if data.item == "kamera1" then
		LokacijaKamere = 0.6
		DaljinaKamere = 1.2
		StranaKamere = 0.2
	elseif data.item == "kamera2" then
		DaljinaKamere = 2
		StranaKamere =0.3
		LokacijaKamere = 0
	elseif data.item == "kamera3" then
		LokacijaKamere = -0.4
		DaljinaKamere = 1.2
		StranaKamere = 0.2
	end
end)

RNC('promjeniHeading', function(data)
	SetEntityHeading(PlayerPedId(),tonumber(data.broj))
end)



Lice1 = 0
Lice2 = 0
Ten = 0
Torbe2 = 0

--ESX.TriggerServerCallback('esx_skin:getPlayerSkin', function(skin)
--	Lice1 = skin.dad
--	Ten = skin.skin_c
--	TriggerEvent('skinchanger:loadSkin', skin)
--end)

BradaBoja = 0
RNC('postRequest', function(data)
	if data.item == "kapa1" then
		
		if tonumber(data.broj) == -1 then
			-- TriggerEvent('skinchanger:getSkin', function(skin)
			-- 	local zaapply = {['helmet_1'] = -1}
			-- 	TriggerEvent('skinchanger:loadClothes', skin, zaapply)
			-- 	TriggerServerEvent('esx_skin:save', skin, zaapply)
			-- end)
			ClearPedProp(PlayerPedId(), 0)
		else
			SetPedPropIndex(PlayerPedId(), odjecaKodovi.kapa, tonumber(data.broj), 0, true)
		end
	elseif data.item == "kapa2" then
		
		SetPedPropIndex(PlayerPedId(), odjecaKodovi.kapa, tonumber(cache["kapa"]), tonumber(data.broj), true)
	elseif data.item == "naocale1" then
		
		SetPedPropIndex(PlayerPedId(), odjecaKodovi.naocale, tonumber(data.broj), 0, true)
	elseif data.item == "naocale2" then
		
		SetPedPropIndex(PlayerPedId(), odjecaKodovi.naocale, tonumber(cache["naocale"]), tonumber(data.broj), true)
	elseif data.item == "maska1" then
		
		SetPedComponentVariation(PlayerPedId(), odjecaKodovi.maska, tonumber(data.broj), 0, 2)
	elseif data.item == "maska2" then
		
		SetPedComponentVariation(PlayerPedId(), odjecaKodovi.maska, tonumber(cache["maska"]), tonumber(data.broj), 2)
	elseif data.item == "jakna1" then
		
		SetPedComponentVariation(PlayerPedId(), odjecaKodovi.torso, tonumber(data.broj), 0, 2)
	elseif data.item == "jakna2" then
		
		SetPedComponentVariation(PlayerPedId(), odjecaKodovi.torso, tonumber(cache["torso"]), tonumber(data.broj), 2)
	elseif data.item == "ruke1" then
		
		SetPedComponentVariation(PlayerPedId(), odjecaKodovi.ruke, tonumber(data.broj), 0, 2)
	elseif data.item == "ruke2" then
		
		SetPedComponentVariation(PlayerPedId(), odjecaKodovi.ruke, tonumber(cache["ruke"]), tonumber(data.broj), 2)
	elseif data.item == "majica1" then
		
		SetPedComponentVariation(PlayerPedId(), odjecaKodovi.potkosulja, tonumber(data.broj), 0, 2)
	elseif data.item == "majica2" then
		
		SetPedComponentVariation(PlayerPedId(), odjecaKodovi.potkosulja, tonumber(cache["potkosulja"]), tonumber(data.broj), 2)
	elseif data.item == "hlace1" then
		SetPedComponentVariation(PlayerPedId(), odjecaKodovi.pantole, tonumber(data.broj), 0, 2)
	elseif data.item == "hlace2" then
		
		SetPedComponentVariation(PlayerPedId(), odjecaKodovi.pantole, tonumber(cache["pantole"]), tonumber(data.broj), 2)
	elseif data.item == "patike1" then
		
		SetPedComponentVariation(PlayerPedId(), odjecaKodovi.cipele, tonumber(data.broj), 0, 2)
	elseif data.item == "patike2" then
		
		SetPedComponentVariation(PlayerPedId(), odjecaKodovi.cipele, tonumber(cache["cipele"]), tonumber(data.broj), 2)
	end

	if data.item == "kosa1" then
		SetPedComponentVariation(PlayerPedId(), odjecaKodovi.kosa, tonumber(data.broj), 0, 2)

	elseif data.item == "kosa2" then
		SetPedHairColor(PlayerPedId(), tonumber(data.broj), 0)

	elseif data.item == "kosa3" then
		SetPedHairColor(PlayerPedId(), GetPedHairColor(PlayerPedId()), tonumber(data.broj))

	elseif data.item == "obrve1" then
		
		SetPedHeadOverlay(PlayerPedId(), facaKodovi.obrve,tonumber(data.broj), (10 / 10) + .0)
	elseif data.item == "obrve2" then
		
		SetPedHeadOverlayColor(PlayerPedId(), facaKodovi.obrve, 1, tonumber(data.broj), 0)
	elseif data.item == "brada1" then
		
		SetPedHeadOverlay(PlayerPedId(), facaKodovi.brada, tonumber(data.broj), 1.0)
	elseif data.item == "brada2" then
		BradaBoja = tonumber(data.broj)
		SetPedHeadOverlayColor(PlayerPedId(), facaKodovi.brada, 1, tonumber(data.broj), 0)
	elseif data.item == "pjegice1" then

		SetPedHeadOverlay(PlayerPedId(), facaKodovi.pjegice, tonumber(data.broj), 1.0)
	elseif data.item == "pjegice2" then
		
		local uspjesno, overlayValue, tipBoje, prvaBoja, drugaBoja, gustoca = GetPedHeadOverlayData(PlayerPedId(), 1)
		SetPedHeadOverlay(PlayerPedId(), facaKodovi.pjegice, overlayValue, tonumber(data.broj)/100+.0+0.75)
	elseif data.item == "bore1" then
		
		SetPedHeadOverlay(PlayerPedId(), 3,	tonumber(data.broj), 10 + 0.0)
	elseif data.item == "bore2" then
		
		local uspjesno, overlayValue, tipBoje, prvaBoja, drugaBoja, gustoca = GetPedHeadOverlayData(PlayerPedId(), 1)
		SetPedHeadOverlay(PlayerPedId(), 3,	overlayValue, tonumber(data.broj) + 0.0)
	end

	if data.item == "obrve3" then
		
		SetPedFaceFeature(PlayerPedId(), 6, tonumber(data.broj) / 10)
	elseif data.item == "obrve4" then
		
		SetPedFaceFeature(PlayerPedId(), 7, tonumber(data.broj) / 10)
	elseif data.item == "podocnjaci1" then
		
		SetPedFaceFeature(PlayerPedId(), 8, tonumber(data.broj) / 10)
	elseif data.item == "obraz1" then
		
		SetPedFaceFeature(PlayerPedId(), 9, tonumber(data.broj) / 10)
	elseif data.item == "obraz2" then
		SetPedFaceFeature(PlayerPedId(), 10, tonumber(data.broj) / 10)

	elseif data.item == "usna1" then
		nmbr = tonumber(data.broj)-50
		SetPedFaceFeature(PlayerPedId(), 12, nmbr / 10) --///////////////////////////////////////////////////////////

	elseif data.item == "oci1" then
		nmbr = tonumber(data.broj)-50
		SetPedFaceFeature(PlayerPedId(), 11, nmbr / 10) --///////////////////////////////////////////////////////////

	elseif data.item == "vrat1" then
		nmbr = tonumber(data.broj)-50
		SetPedFaceFeature(PlayerPedId(), 19, nmbr / 10) --///////////////////////////////////////////////////////////

	elseif data.item == "nos1" then
		Nos1 = tonumber(data.broj)+.0
		SetPedFaceFeature(PlayerPedId(), 1, tonumber(data.broj) / 10)
	elseif data.item == "nos2" then
		Nos2 = tonumber(data.broj)+.0
		SetPedFaceFeature(PlayerPedId(), 2, tonumber(data.broj) / 10)
	elseif data.item == "nos3" then
		Nos3 = tonumber(data.broj)+.0
		SetPedFaceFeature(PlayerPedId(), 3, tonumber(data.broj) / 10)
	elseif data.item == "nos4" then
		Nos4 = tonumber(data.broj)+.0
		SetPedFaceFeature(PlayerPedId(), 4, tonumber(data.broj) / 10)



    -- ////////////////////////////////////////////////////////////// --
	elseif data.item == "sjenilo1" then
		bool, type_v2, boja,boja2, jacina = GetPedHeadOverlayData(PlayerPedId(),4)
		if jacina == 0 then
			jacina = 1.0
		end
		SetPedHeadOverlay(PlayerPedId(), 4, tonumber(data.broj), jacina)

	elseif data.item == "sjenilo2" then
		SetPedHeadOverlayColor(PlayerPedId(), 4, 2, tonumber(data.broj), tonumber(data.broj))

	elseif data.item == "sjenilo3" then
		bool, type_v2, boja,boja2, jacina = GetPedHeadOverlayData(PlayerPedId(),4)
		if tonumber(data.broj)/100+.0 <= 0.2 then
			NMBR = 0.2
		else
			NMBR = tonumber(data.broj)/100+.0
		end
		SetPedHeadOverlay(PlayerPedId(), 4, type_v2, NMBR)
	-- ////////////////////////////////////////////////////////////// --
	 -- ////////////////////////////////////////////////////////////// --
	elseif data.item == "puder1" then
		bool, type_v2, boja,boja2, jacina = GetPedHeadOverlayData(PlayerPedId(),6)
		if jacina == 0 then
			jacina = 1.0
		end
		SetPedHeadOverlay(PlayerPedId(), 6, tonumber(data.broj), jacina)

	elseif data.item == "puder2" then
		SetPedHeadOverlayColor(PlayerPedId(), 6, 2, tonumber(data.broj), 0)

	elseif data.item == "puder3" then
		bool, type_v2, boja,boja2, jacina = GetPedHeadOverlayData(PlayerPedId(),6)
		if tonumber(data.broj)/100+.0 <= 0.2 then
			NMBR = 0.2
		else
			NMBR = tonumber(data.broj)/100+.0
		end
		SetPedHeadOverlay(PlayerPedId(), 6, type_v2, NMBR)
	-- ////////////////////////////////////////////////////////////// --

	elseif data.item == "ruz1" then
		bool, type_v2, boja,boja2, jacina = GetPedHeadOverlayData(PlayerPedId(),8)
		if jacina == 0 then
			jacina = 1.0
		end
		print(jacina)
		SetPedHeadOverlay(PlayerPedId(), 8, tonumber(data.broj), jacina)

	elseif data.item == "ruz2" then
		SetPedHeadOverlayColor(PlayerPedId(), 8, 2, tonumber(data.broj), 0)

	elseif data.item == "ruz3" then
		bool, type_v2, boja,boja2, jacina = GetPedHeadOverlayData(PlayerPedId(),8)
		if tonumber(data.broj)/100+.0 <= 0.2 then
			NMBR = 0.2
		else
			NMBR = tonumber(data.broj)/100+.0
		end
		SetPedHeadOverlay(PlayerPedId(), 8, type_v2, NMBR)

	-- ////////////////////////////////////////////////////////////// --
	elseif data.item == "rumenilo1" then
		bool, type_v2, boja,boja2, jacina = GetPedHeadOverlayData(PlayerPedId(),5)
		if jacina == 0 then
			jacina = 1.0
		end
		SetPedHeadOverlay(PlayerPedId(), 5, tonumber(data.broj), jacina)

	elseif data.item == "rumenilo2" then
		SetPedHeadOverlayColor(PlayerPedId(), 5, 2, tonumber(data.broj), 0)

	elseif data.item == "rumenilo3" then
		bool, type_v2, boja,boja2, jacina = GetPedHeadOverlayData(PlayerPedId(),5)
		if tonumber(data.broj)/100+.0 <= 0.2 then
			NMBR = 0.2
		else
			NMBR = tonumber(data.broj)/100+.0
		end
		SetPedHeadOverlay(PlayerPedId(), 5, type_v2, NMBR)
	-- ////////////////////////////////////////////////////////////// --
	elseif data.item == "brada3" then
		SetPedFaceFeature(PlayerPedId(), 15, tonumber(data.broj) / 10)
	elseif data.item == "brada4" then

		SetPedFaceFeature(PlayerPedId(), 16, tonumber(data.broj) / 10)
	elseif data.item == "brada5" then
		
		SetPedFaceFeature(PlayerPedId(), 17, tonumber(data.broj) / 10)
	elseif data.item == "brada6" then
		SetPedFaceFeature(PlayerPedId(), 18, tonumber(data.broj) / 10)

	elseif data.item == "celjust1" then

		SetPedFaceFeature(PlayerPedId(), 13, tonumber(data.broj) / 10)
	elseif data.item == "celjust2" then

		SetPedFaceFeature(PlayerPedId(), 14, tonumber(data.broj) / 10)
	end


	if data.item == "narukvica1" then
		

		if tonumber(data.broj) == -1 then
			ClearPedProp(PlayerPedId(), odjecaKodovi.narukvica)
		else
			SetPedPropIndex(PlayerPedId(), odjecaKodovi.narukvica, tonumber(data.broj), 0, true)
		end
	elseif data.item == "narukvica2" then
		
		SetPedPropIndex(PlayerPedId(), odjecaKodovi.narukvica, tonumber(cache["narukvica"]), tonumber(data.broj), true)
	elseif data.item == "sat1" then
		
		SetPedPropIndex(PlayerPedId(), odjecaKodovi.sat, tonumber(data.broj), 0, true)
	elseif data.item == "sat2" then
		SetPedPropIndex(PlayerPedId(), odjecaKodovi.sat, tonumber(cache["sat"]), tonumber(data.broj), true)


	elseif data.item == "usi1" then
		if tonumber(data.broj) == -1 then
			ClearPedProp(PlayerPedId(), 2)
		else
			SetPedPropIndex(PlayerPedId(), 2, tonumber(data.broj), 0, true)
		end
	elseif data.item == "usi2" then
		SetPedPropIndex(PlayerPedId(), 2, GetPedPropIndex(PlayerPedId(),2), tonumber(data.broj), true)

	elseif data.item == "pancir1" then
		SetPedComponentVariation(PlayerPedId(), 9, tonumber(data.broj), 0, 2)
	elseif data.item == "pancir2" then
		SetPedComponentVariation(PlayerPedId(), 9, tonumber(cache["pancir"]), tonumber(data.broj), 2)


	elseif data.item == "torbe1" then
		SetPedComponentVariation(PlayerPedId(), 5, tonumber(data.broj), 0, 2)
	elseif data.item == "torbe2" then
		Torbe2 = tonumber(data.broj)
		SetPedComponentVariation(PlayerPedId(), 5, GetPedDrawableVariation(PlayerPedId(),5), Torbe2, 2)

	elseif data.item == "dodaci1" then
		SetPedComponentVariation(PlayerPedId(), 7, tonumber(data.broj), 0, 2)
	elseif data.item == "dodaci2" then
		SetPedComponentVariation(PlayerPedId(), 7, GetPedDrawableVariation(PlayerPedId(),7), tonumber(data.broj), 2)

	elseif data.item == "lice1" then
		Lice1 = tonumber(data.broj)
		-- 0 = MUSKO
		-- 1 = ZENSKO
		SetPedHeadBlendData(PlayerPedId(), 0, Lice1, 0, 0, Ten, 0, 1.0, 1.0, 0.0, false)


	elseif data.item == "naljepnice1" then
		SetPedComponentVariation(PlayerPedId(), 10, tonumber(data.broj), 0, 2)
	elseif data.item == "naljepnice2" then
		SetPedComponentVariation(PlayerPedId(), 10, GetPedDrawableVariation(PlayerPedId(),10), tonumber(data.broj), 2)

	elseif data.item == "lice2" then
		Lice2 = tonumber(data.broj)
		SetPedHeadBlendData(PlayerPedId(), Lice2, Lice1, 0, 0, Ten, 0, 1.0, 1.0, 0.0, false)
	elseif data.item == "ten1" then
		Ten = tonumber(data.broj)
		SetPedHeadBlendData(PlayerPedId(), Lice2, Lice1, 0, 0, Ten, 0, 1.0, 1.0, 0.0, false)
	end 

	if data.item == "skinuto3" and data.broj then
		TE('sevenq-butik:torsoToggle')
	elseif data.item == "skinuto1" then
		TE('sevenq-butik:kapaToggle')
	elseif data.item == "skinuto4" then
		TE('sevenq-butik:pantoleToggle')
	elseif data.item == "skinuto5" then
		TE('sevenq-butik:cipeleToggle')
	elseif data.item == "skinuto2" then
		TE('sevenq-butik:caleToggle')
	end

	if data.item == "spremljeno" and data.broj then
		ESX.TriggerServerCallback('butik:provjeriPare', function(moze)
			if moze then
				TriggerEvent('skinchanger:getSkin', function(skin)

					skin.sex = GetajSexInfo()
					skin.torso_1 = tonumber(cache["torso"])
					skin.mom = Lice2
					skin.dad = Lice1
					skin.skin_c = Ten
					bool, brada_type_v2, brada_boja,brada_drugaboja, brada_jacina = GetPedHeadOverlayData(PlayerPedId(),1)
					skin.beard_1 = tonumber(brada_type_v2)
					skin.beard_2 =  10
					skin.beard_3 = tonumber(brada_drugaboja)
					skin.beard_4 = tonumber(brada_drugaboja)


					skin.hair_1 = tonumber(cache["kosa"])
					skin.hair_color_1 = GetPedHairColor(PlayerPedId())
					skin.hair_color_2 = GetPedHairHighlightColor(PlayerPedId())

					local uspjesno, overlayValue, tipBoje, prvaBoja, drugaBoja, gustoca = GetPedHeadOverlayData(PlayerPedId(), facaKodovi.bore)
					skin.age_1 = overlayValue
					skin.age_2 = gustoca


					skin.eyebrows_5 = GetPedFaceFeature(PlayerPedId(),6)*10
					skin.eyebrows_6 = GetPedFaceFeature(PlayerPedId(),7)*10

					local uspjesno99, overlayValue99, tipBoje99, prvaBoja99, drugaBoja99, gustoca99 = GetPedHeadOverlayData(PlayerPedId(), 4)
					--skin.makeup_3 = prvaBoja99
					--skin.makeup_4 = drugaBoja99
				--	skin.makeup_1 = overlayValue99


					skin.cheeks_1 = GetPedFaceFeature(PlayerPedId(),8)*10
					skin.cheeks_2 = GetPedFaceFeature(PlayerPedId(),9)*10
					skin.cheeks_3 = GetPedFaceFeature(PlayerPedId(),10)*10

					skin.jaw_1 = GetPedFaceFeature(PlayerPedId(),13)*10
					skin.jaw_2 = GetPedFaceFeature(PlayerPedId(),14)*10

					skin.chin_1 = GetPedFaceFeature(PlayerPedId(),15)*10
					skin.chin_2 = GetPedFaceFeature(PlayerPedId(),16)*10
					skin.chin_3 = GetPedFaceFeature(PlayerPedId(),17)*10
					skin.chin_4 = GetPedFaceFeature(PlayerPedId(),18)*10

					skin.bags_1 = GetPedDrawableVariation(PlayerPedId(),5)
					skin.bags_2 = GetPedTextureVariation(PlayerPedId(),5)

					skin.chain_1 = GetPedDrawableVariation(PlayerPedId(),7)
					skin.chain_2 = GetPedTextureVariation(PlayerPedId(),7)

					skin.decals_1 = GetPedDrawableVariation(PlayerPedId(),10)
					skin.decals_2 = GetPedTextureVariation(PlayerPedId(),10)


					skin.lip_thickness = GetPedFaceFeature(PlayerPedId(),12)*10
					skin.eye_squint = GetPedFaceFeature(PlayerPedId(),11)*10
					skin.neck_thickness = GetPedFaceFeature(PlayerPedId(),19)*10

					skin.ears_1	= GetPedPropIndex(PlayerPedId(),2)
					skin.ears_2 = 0


					-- SJENILO --
					bool, type_v2, boja,boja2, jacina = GetPedHeadOverlayData(PlayerPedId(),4)

					if jacina == 0 then
						jacina = 10
					end
					skin.makeup_1 = type_v2
					skin.makeup_2 = jacina
					skin.makeup_3 = boja2
					skin.makeup_4 = boja2

					
					bool, type_v2, boja,boja2, jacina = GetPedHeadOverlayData(PlayerPedId(),6)
					if jacina == 0 then
						jacina = 10
					end
					skin.complexion_1 = type_v2
					skin.complexion_2 = jacina

					bool, type_v2, boja,boja2, jacina = GetPedHeadOverlayData(PlayerPedId(),8)
					if jacina == 0 then
						jacina = 10
					end
					skin.lipstick_1 = type_v2
					skin.lipstick_2 = jacina
					skin.lipstick_3 = boja2
					skin.lipstick_4 = 0


					bool, type_v2, boja,boja2, jacina = GetPedHeadOverlayData(PlayerPedId(),5)
					if jacina == 0 then
						jacina = 10
					end
					skin.blush_1 = type_v2
					skin.blush_2 = jacina
					skin.blush_3 = boja2

					bool, type_v2, boja,boja2, jacina = GetPedHeadOverlayData(PlayerPedId(),5)
					if jacina == 0 then
						jacina = 10
					end
					skin.blush_1 = type_v2
					skin.blush_2 = jacina
					skin.blush_3 = boja2
					skin.blush_4 = 0


					local uspjesno3, overlayValue3, tipBoje3, prvaBoja3, drugaBoja3, gustoca3 = GetPedHeadOverlayData(PlayerPedId(), facaKodovi.pjegice)

					skin.blemishes = overlayValue3
					skin.blemishes_size = gustoca3

					local uspjesno4, overlayValue4, tipBoje4, prvaBoja4, drugaBoja4, gustoca4 = GetPedHeadOverlayData(PlayerPedId(), sirineKodovi.nosSirina)
					local uspjesno5, overlayValue5, tipBoje5, prvaBoja5, drugaBoja5, gustoca5 = GetPedHeadOverlayData(PlayerPedId(), sirineKodovi.nosVisina)
					skin.nose_2 = GetPedFaceFeature(PlayerPedId(),1)*10
					skin.nose_3 = GetPedFaceFeature(PlayerPedId(),2)*10
					skin.nose_4 = GetPedFaceFeature(PlayerPedId(),3)*10
					skin.nose_5 = GetPedFaceFeature(PlayerPedId(),4)*10

					skin.torso_1 = tonumber(cache["torso"])
					skin.torso_2 = tonumber(cache["torso2"])
					skin.mask_1 = tonumber(cache["maska"])
					skin.mask_2 = tonumber(cache["maska2"])
					skin.helmet_1 = tonumber(cache["kapa"])
					skin.helmet_2 = tonumber(cache["kapa2"])
					skin.pants_1 = tonumber(cache["pantole"])
					skin.pants_2 = tonumber(cache["pantole2"])
					skin.shoes_1 = tonumber(cache["cipele"])
					skin.shoes_2 = tonumber(cache["cipele2"])
					skin.bproof_1 = tonumber(cache["pancir"])
					skin.bproof_2 = tonumber(cache["pancir2"])
					skin.glasses_1 = tonumber(cache["naocale"])
					skin.glasses_2 = tonumber(cache["naocale2"])
					skin.arms = tonumber(cache["ruke"])
					skin.arms_2 = tonumber(cache["ruke2"])
					skin.tshirt_1 = tonumber(cache["potkosulja"])
					skin.tshirt_2 = tonumber(cache["potkosulja2"])
					skin.bracelets_1 = tonumber(cache["narukvica"])
					skin.bracelets_2 = tonumber(cache["narukvica2"])
					skin.watches_1 = tonumber(cache["sat"])
					skin.watches_2 =tonumber(cache["sat2"])
		
					TSE('esx_skin:save', skin)
					if not DaLiJeKomandaSkin then
						TSE('butik:naplatiPare', Config.cijenaObicna)
					end
					DaLiJeKomandaSkin = false
					TriggerEvent("esx:restoreLoadout")
				end)
			else
				ESX.ShowNotification('Nemate dovoljno novca za spremanje odjece!')
				ESX.TriggerServerCallback('esx_skin:getPlayerSkin', function(skin)
					TriggerEvent('skinchanger:loadSkin', skin)
				end)
			end
		end, Config.cijenaObicna) 
		TE('butik:closeHandler')
	elseif data.item == "spremljeno" and data.broj == false then
			ESX.TriggerServerCallback('esx_skin:getPlayerSkin', function(skin)
				TriggerEvent('skinchanger:loadSkin', skin)
			end)
		TE('butik:closeHandler')
	end
	if data.item == "pol" then
		if tonumber(data.broj) == 1 then
			--TE('butik:setajSkin', 'mp_m_freemode_01')

			local skin = "mp_m_freemode_01"
			local model = GetHashKey(skin)
        	RequestModel(model)
        	while not HasModelLoaded(model) do
        	    RequestModel(model)
        	    Citizen.Wait(0)
        	end
        	SetPlayerModel(PlayerId(), model)
        	SetPedComponentVariation(PlayerPedId(), 0, 0, 0, 2)
        	SetPedHeadBlendData(PlayerPedId(), Lice2, Lice1, 0, 0, Ten, 0, 1.0, 1.0, 0.0, false)


        	--- EDITOVANO --
        	SetPedComponentVariation(PlayerPedId(), odjecaKodovi.torso, -1, 0, 2)
        	SetPedComponentVariation(PlayerPedId(), odjecaKodovi.ruke, 15, 0, 2)
        	SetPedComponentVariation(PlayerPedId(), odjecaKodovi.potkosulja, -1, 0, 2)
        	SetPedComponentVariation(PlayerPedId(), odjecaKodovi.pantole, 79, 0, 2)
        	SetPedComponentVariation(PlayerPedId(), odjecaKodovi.cipele, 38, 0, 2)
			--- EDITOVANO --
			TriggerEvent("esx:restoreLoadout")



			ESX.ShowNotification('Prebacili ste spol na Musko!')
		else
			--TE('butik:setajSkin', 'mp_f_freemode_01')

			local skin = "mp_f_freemode_01"
			local model = GetHashKey(skin)
        	RequestModel(model)
        	while not HasModelLoaded(model) do
        	    RequestModel(model)
        	    Citizen.Wait(0)
        	end
        	SetPlayerModel(PlayerId(), model)
        	SetPedComponentVariation(PlayerPedId(), 0, 0, 0, 2)
        	SetPedHeadBlendData(PlayerPedId(), Lice2, Lice1, 0, 0, Ten, 0, 1.0, 1.0, 0.0, false)

        	--- EDITOVANO ZENA ---
        	SetPedComponentVariation(PlayerPedId(), odjecaKodovi.kosa, -1, 0, 2)
        	SetPedComponentVariation(PlayerPedId(), odjecaKodovi.ruke, 15, 0, 2)
        	SetPedComponentVariation(PlayerPedId(), odjecaKodovi.potkosulja, -1, 0, 2)
        	SetPedComponentVariation(PlayerPedId(), odjecaKodovi.torso, 2, 0, 2)
        	SetPedComponentVariation(PlayerPedId(), odjecaKodovi.pantole, 96, 0, 2)
        	SetPedComponentVariation(PlayerPedId(), odjecaKodovi.cipele, 5, 0, 2)
        	--- EDITOVANO ZENA ---
        	TriggerEvent("esx:restoreLoadout")

			ESX.ShowNotification('Prebacili ste spol na Zensko!')
		end
	end
end)

RNE('butik:closeHandler', function()
	SendNUIMessage({tip = "zatvori"})
	SetNuiFocus(false, false)
	DeleteSkinCam()
end)

function GetajSexInfo() 
	model = GetEntityModel(PlayerPedId())
	zaReturn = 0
	if model == 1885233650 then
		zaReturn = 0
	elseif model == -1667301416 then
		zaReturn = 1
	end
	return zaReturn
end


RNE('butik:setajSkin')
AEH('butik:setajSkin', function(skin)
    Citizen.CreateThread(function()
        local model = GetHashKey(skin)
        RequestModel(model)
        while not HasModelLoaded(model) do
            RequestModel(model)
            Citizen.Wait(0)
        end
        SetPlayerModel(PlayerId(), model)
        SetPedComponentVariation(PlayerPedId(), 0, 0, 0, 2)
        SetPedHeadBlendData(PlayerPedId(), Lice2, Lice1, 0, 0, Ten, 0, 1.0, 1.0, 0.0, false)
    end)
end)

RNE('butik:opcije')
AEH('butik:opcije', function()
	TriggerEvent('nh-context:sendMenu', {
		{
			id = 1,
			header = "Opcije Butika",
			txt = ""
		},
		{
			id = 2,
			header = "Sacuvaj svoj outfit!",
			txt = "Pritisnite da sacuvate outfit!",
			params = {
				event = "butik:opcijeSaveanja",
                args = 1,
			}
		},
		{
			id = 3,
			header = "Pogledaj sacuvane outfite!",
			txt = "Pritisnite da pogledate listu outfita!",
			params = {
				event = "butik:opcijeSaveanja",
                args = 2,
			}
		},
		{
			id = 4,
			header = "Obrisi sacuvane outfite!",
			txt = "Pritisnite da briste outfite iz liste!",
			params = {
				event = "butik:opcijeSaveanja",
                args = 3,
			}
		},
	})
end)

RNE('butik:opcijeSaveanja', function(opcija)
	if opcija == 1 then
		ESX.TriggerServerCallback('butik:provjeriPare', function(moze)
			if moze then
				ESX.UI.Menu.Open('dialog', GetCurrentResourceName(), 'saveanjetekst', {
					title = "Upisite Ime Outfita",
				}, function (dataMenija, meni)
					local ime = dataMenija.value
					if ime == nil then
						ESX.ShowNotification('Greska.')
					else
						
						ESX.TriggerServerCallback('esx_skin:getPlayerSkin', function(skin)
							TriggerServerEvent('revolucija_butikcic:saveOutfit', ime, skin)
						end)

						ESX.ShowNotification('Uspjesno ste sacuvali outfit!')
						meni.close()
					end
				end, function (dataMenija, meni)
					meni.close()
				end)
			else
				ESX.ShowNotification('Nemate dovoljno novca za saveanje outfita!')
			end
		end, Config.cijenaSave)
	elseif opcija == 2 then
		ESX.TriggerServerCallback('revolucija_butikcic:getPlayerDressing', function(dressing)
  
			local elements = {}
	
			for i=1, #dressing, 1 do
			  table.insert(elements, {label = dressing[i], value = i})
			end
	
			if #dressing <= 0 then
				ESX.ShowNotification('Nemate nijedan outfit')
				return
			end
	
			ESX.UI.Menu.Open('default', GetCurrentResourceName(), 'player_dressing', {
				title    = 'Lista Outfita',
				align    = 'top-left',
				elements = elements,
			  }, function(data, menu)
	
				TriggerEvent('skinchanger:getSkin', function(skin)
	
				  ESX.TriggerServerCallback('revolucija_butikcic:getPlayerOutfit', function(clothes)
					SetPedComponentVariation(PlayerPedId(), odjecaKodovi.kosa, tonumber(clothes.hair_1), 0, 2)
					SetPedHairColor(PlayerPedId(), tonumber(clothes.hair_color_1), 0)
	
					TriggerEvent('skinchanger:loadClothes', skin, clothes)
					TriggerEvent('skinchanger:loadSkin', clothes)

					TriggerEvent('esx_skin:setLastSkin', skin)
	
					TriggerEvent('skinchanger:getSkin', function(skin)
					  TriggerServerEvent('esx_skin:save', skin)
					end)
	
					ESX.ShowNotification('Ucitali ste outfit!')
	
				  end, data.current.value)
	
				end)
	
			  end,
			  function(data, menu)
				menu.close()
				Wait(300)
			  end)
		  end)
	elseif opcija == 3 then
		ESX.TriggerServerCallback('revolucija_butikcic:getPlayerDressing', function(dressing)
			local elements = {}
	
			for i=1, #dressing, 1 do
				table.insert(elements, {label = dressing[i], value = i})
			end
	
			if #dressing <= 0 then
				ESX.ShowNotification('Nemate nijedan outfit')
				return
			end
	
			ESX.UI.Menu.Open(
			'default', GetCurrentResourceName(), 'supprime_cloth',
			{
			  title    = 'Brisanje Outfita',
			  align    = 'top-left',
			  elements = elements,
			},
			function(data, menu)
			menu.close()
			Wait(300)

			TriggerServerEvent('revolucija_butikcic:deleteOutfit', data.current.value)
			ESX.ShowNotification('Obrisali ste outfit!')
	
			end,
			function(data, menu)
			  menu.close()
			end)
		end)
	end
end)

CMD('skinfix', function()
	ESX.TriggerServerCallback('esx_skin:getPlayerSkin', function(skin)
		TriggerEvent('skinchanger:loadSkin', skin)
	end)
end)

RNE('butik:bradaHandler', function()
	ESX.TriggerServerCallback('esx_skin:getPlayerSkin', function(skin)
		SetPedHeadOverlay(PlayerPedId(), facaKodovi.brada, tonumber(skin.beard_1), skin.beard_2)
		SetPedHeadOverlayColor(PlayerPedId(), facaKodovi.brada, 1, tonumber(skin.beard_color_1), 0)
	end)
end)

RNE("sevenq-butik:torsoToggle", function(data, cb)
	local pedara = PlayerPedId()
  
	if not torsocachean then
	  torsocachean = true
	  cache["torsobroj"] = GetPedDrawableVariation(pedara, odjecaKodovi.torso)
	  cache["torsotextura"] = GetPedTextureVariation(pedara, odjecaKodovi.tors)
	end
  
	if not torsoskinut then
	  torsoskinut = true
	  SetPedComponentVariation(PlayerPedId(), odjecaKodovi.torso, 15, 0, 0)
	  ESX.ShowNotification('Skinuli ste torso!')
	else
	  torsoskinut = false
	  torsocachean = false
	  SetPedComponentVariation(pedara, odjecaKodovi.torso, cache["torsobroj"], cache["torsotextura"])
	  ESX.ShowNotification('Obukli ste torso!')
	end
end)

RNE("sevenq-butik:kapaToggle", function(data, cb)
	local pedara = PlayerPedId()
  
	if not kapacacheana then
	  kapacacheana = true
	  cache["kapabroj"] = GetPedPropIndex(pedara, odjecaKodovi.kapa)
	  cache["kapatexture"] = GetPedPropTextureIndex(pedara, odjecaKodovi.kapa)
	end
  
	if not kapaskinuta then
	  kapaskinuta = true
	  
	--   TriggerEvent('skinchanger:getSkin', function(skin)
	-- 	local zaapply = {['helmet_1'] = -1, ['helmet_2'] = 0}
	-- 	TriggerEvent('skinchanger:loadClothes', skin, zaapply)
	--   end)
	ClearPedProp(PlayerPedId(), 0)

  
	  ESX.ShowNotification('Skinuli ste kapu!')
	else
	  kapaskinuta = false
	  kapacacheana = false
	  SetPedPropIndex(pedara, odjecaKodovi.kapa, cache["kapabroj"], cache["kapatexture"], true)
	  ESX.ShowNotification('Obukli ste kapu!')
	end
end)

RNE("sevenq-butik:caleToggle", function(data, cb)
	local pedara = PlayerPedId()
  
	if not naocalecacheane then
		naocalecacheane = true
	  cache["naocalebrojj"] = GetPedPropIndex(pedara, odjecaKodovi.naocale)
	  cache["naocaletekstura"] = GetPedPropTextureIndex(pedara, odjecaKodovi.naocale)
	end
  
	if not naocaleskinute then
		naocaleskinute = true
		ClearPedProp(PlayerPedId(), odjecaKodovi.naocale)
		ESX.ShowNotification('Skinuli ste naocale!')  
	else
		naocaleskinute = false
		naocalecacheane = false
		SetPedPropIndex(pedara, odjecaKodovi.naocale, cache["naocalebrojj"], cache["naocaletekstura"], true)
		ESX.ShowNotification('Obukli ste naocale!')
	end
end)
RNE("sevenq-butik:pantoleToggle", function(data, cb)
	local pedara = PlayerPedId()
  
	if not pantolecacheane then
	  pantolecacheane = true
	  cache["pantolebroj"] = GetPedDrawableVariation(pedara, odjecaKodovi.pantole)
	  cache["pantoletextura"] = GetPedTextureVariation(pedara, odjecaKodovi.pantole)
	end
  
	if not pantoleskinute then
	  pantoleskinute = true
	  SetPedComponentVariation(PlayerPedId(), odjecaKodovi.pantole, 14, 0, 0)
	  ESX.ShowNotification('Skinuli ste pantole!')
	else
	  pantoleskinute = false
	  pantolecacheane = false
	  SetPedComponentVariation(pedara, odjecaKodovi.pantole, cache["pantolebroj"], cache["pantoletextura"])
	  ESX.ShowNotification('Obukli ste pantole!')
	end
end)


RNE("sevenq-butik:cipeleToggle", function(data, cb)
	local pedara = PlayerPedId()
  
	if not cipelecacheane then
	  cipelecacheane = true
	  cache["cipelebroj"] = GetPedDrawableVariation(pedara, odjecaKodovi.cipele)
	  cache["cipeletextura"] = GetPedTextureVariation(pedara, odjecaKodovi.cipele)
	end
  
	if not cipeleskinute then
	  cipeleskinute = true
	  SetPedComponentVariation(PlayerPedId(), odjecaKodovi.cipele, 35, 0, 0)
	  ESX.ShowNotification('Skinuli ste cipele!')
	else
	  cipeleskinute = false
	  cipelecacheane = false
	  SetPedComponentVariation(pedara, odjecaKodovi.cipele, cache["cipelebroj"], cache["cipeletextura"])
	  ESX.ShowNotification('Obukli ste cipele!')
	end
  
  end)
