local TE = TriggerEvent
local TSE = TriggerServerEvent
local AEH = AddEventHandler
local RSE = RegisterServerEvent
local CMD = RegisterCommand
local RNC = RegisterNUICallback
local CT = CreateThread

local ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

ESX.RegisterServerCallback('butik:provjeriPare', function(source, cb, kolicina)
	local xPlayer = ESX.GetPlayerFromId(source)
	
	if xPlayer.getMoney() >= kolicina then
		cb(true)
	else
		cb(false)
	end
end)

RSE('butik:naplatiPare')
AEH('butik:naplatiPare', function(kolicina)
	local xPlayer = ESX.GetPlayerFromId(source)
	xPlayer.removeMoney(kolicina)
	xPlayer.showNotification('Skinuto vam je $' .. kolicina .. ' zbog promjene odjece!')
end)

RegisterServerEvent('revolucija_butikcic:saveOutfit')
AddEventHandler('revolucija_butikcic:saveOutfit', function(label, skin)
	local xPlayer = ESX.GetPlayerFromId(source)

	TriggerEvent('esx_datastore:getDataStore', 'property', xPlayer.identifier, function(store)
		local dressing = store.get('dressing')

		if dressing == nil then
			dressing = {}
		end

		table.insert(dressing, {
			label = label,
			skin  = skin
		})

		store.set('dressing', dressing)
	end)
end)

RSE('revolucija_butikcic:deleteOutfit')
AEH('revolucija_butikcic:deleteOutfit', function(label)
	local xPlayer = ESX.GetPlayerFromId(source)
	TriggerEvent('esx_datastore:getDataStore', 'property', xPlayer.identifier, function(store)
		local dressing = store.get('dressing')

		if dressing == nil then
			dressing = {}
		end

		label = label
		table.remove(dressing, label)
		store.set('dressing', dressing)
	end)
end)


ESX.RegisterServerCallback('revolucija_butikcic:checkPropertyDataStore', function(source, cb)
	local xPlayer = ESX.GetPlayerFromId(source)
	local foundStore = false
	TriggerEvent('esx_datastore:getDataStore', 'property', xPlayer.identifier, function(store)
		foundStore = true
	end)
	cb(foundStore)
end)

ESX.RegisterServerCallback('revolucija_butikcic:getPlayerDressing', function(source, cb)
  local xPlayer  = ESX.GetPlayerFromId(source)
  TriggerEvent('esx_datastore:getDataStore', 'property', xPlayer.identifier, function(store)
    local count = store.count('dressing')
    local labels = {}

    for i=1, count, 1 do
      local entry = store.get('dressing', i)
      table.insert(labels, entry.label)
    end

    cb(labels)
  end)
end)

ESX.RegisterServerCallback('revolucija_butikcic:getPlayerOutfit', function(source, cb, num)
  local xPlayer  = ESX.GetPlayerFromId(source)
  TriggerEvent('esx_datastore:getDataStore', 'property', xPlayer.identifier, function(store)
    local outfit = store.get('dressing', num)
    cb(outfit.skin)
  end)
  end)


-- SKIN KOMANDA --
local DozvoljeneAdminGrupe = {
	["streamer"] = true,
	["superadmin"] = true,
	["headstaff"] = true,
	["developer"] = true,
	["menadzer"] = true
}
RegisterCommand("skin", function(source, args)
	local src = source
	local igrac = ESX.GetPlayerFromId(src)
	local grupa = igrac.getGroup()
	if DozvoljeneAdminGrupe[grupa] then
		local drugiigrac = ESX.GetPlayerFromId(args[1])
		if drugiigrac then
			drugiigrac.triggerEvent('openClothes_shop_target',true)
		else
			igrac.triggerEvent('openClothes_shop_target',true)
		end
	else
	end
end, false)
-- SKIN KOMANDA --